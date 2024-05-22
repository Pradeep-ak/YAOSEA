const orderRepo = require('../models/order')

_getOrder = (orderId, emailID, telNum) => {
    return orderRepo.findOne(
        {
            "Status" : { $in: ["SUBMITTED","CONFIRMED"] },
            "Order_id" : orderId,
            "PersonalInfo.email" : {"$eq" : emailID, "$exists" : true},
            "PersonalInfo.phoneNumber" : {"$eq" : telNum, "$exists" : true}
        }
    )
}

_getOrders = (startDate, endDate) => {
    console.log({
        "Status" : { $in: ["SUBMITTED","CONFIRMED"] },
        "orderDetails.submittedDate": {$gte: startDate, $lt: endDate, "$exists" : true}
    })
    return orderRepo.find(
        {
            "Status" : { $in: ["SUBMITTED","CONFIRMED"] },
            "orderDetails.submittedDate": {$gte: parseInt(startDate), $lt: parseInt(endDate), "$exists" : true}
        }
    )
}

_getSubmittedOrderFromId = (orderId) => {
    return orderRepo.findOne(
        {
            "Status" : { $in: ["SUBMITTED","CONFIRMED"] },
            "Order_id" : orderId
        }
    )
}

module.exports = {
    getOrder:_getOrder,
    getOrders:_getOrders,
    getSubmittedOrderFromId:_getSubmittedOrderFromId
}