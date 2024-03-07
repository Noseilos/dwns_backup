const Reports = require('../models/reportsModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently booked report
    const report = await Reports.findById(req.params.reportId)

    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/`,
        cancel_url: `${req.protocol}://${req.get('host')}/report/${report.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.reportId,
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `${report.name} Report`,
                        description: report.summary,
                        images: [`https://www.natours.dev/img/tours/${report.imageCover}`],
                    },
                    unit_amount: report.price * 100,
                },
                quantity: 1,
            },
        ],
    })

    // 3) Create sessions as response
    res.status(200).json({
        status: 'success',
        session
    })
})