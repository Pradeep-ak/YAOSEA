const Excel = require('exceljs')

_mapOrders2Resposne = (data) => {
    return data.map(e=>{
        return {
            'order_id':e.Order_id,
            'total':e.PriceInfo.orderTotal,
            'items':e.ItemList.length,
            'submitted':e.orderDetails.submittedDate,
            'shippingAddress':{
                'address1':e.ShippingInfo.address.address1,
                'address2':e.ShippingInfo.address.address2,
                'city':e.ShippingInfo.address.city,
                'state':e.ShippingInfo.address.state,
                'country':e.ShippingInfo.address.country,
                'pincode':e.ShippingInfo.address.pincode,
                'phoneNumber':e.PersonalInfo.phoneNumber,
                'fName':e.PersonalInfo.fname,
                'lName':e.PersonalInfo.lname
            }
        }
    });
}

_mapOrder2Resposne = (data) => {
    return data
}

_downloadOrders = (data) =>{
    var workbook = new Excel.Workbook();

    workbook.creator = 'Localshop Application';
    workbook.lastModifiedBy = 'Localshop Application';
    workbook.created = new Date(1985, 3, 22);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(1985, 3, 22);
    workbook.properties.date1904 = true;

    workbook.views = [
        {
            x: 0, y: 0, width: 10000, height: 20000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
    ];
    var worksheet = workbook.addWorksheet('Orders');
    worksheet.columns = [
        { header: 'S.No', key: 'id', width: 10, style:{font:{bold:true}}},
        { header: 'Order Id', key: 'orderId', width: 32 },
        { header: 'Submited on', key: 'orderSubmit', width: 50},
        { header: 'Item Number', key: 'items', width: 30},
        { header: 'Items', key: 'idetails', width: 30},
        { header: 'Total Amount', key: 'amount', width: 50},
        { header: 'Customer Info', key: 'customer', width: 10},
        { header: 'Phone Number', key: 'phonenum', width: 10},
        { header: 'Ship To', key: 'shipto', width: 10},
        { header: 'Payments Type', key: 'ptype', width: 30},
        { header: 'transaction', key: 'transaction', width: 30},
        { header: 'payments', key: 'payments', width: 30}
    ];
    count = 1;
    data.forEach(ele => {
        worksheet.addRow({ 
            id: count, 
            orderId: ele.Order_id, 
            //orderSubmit:new Date(ele.submittedDate),  
            items:ele.ItemList.length, 
            idetails:ele.ItemList.map(e=>e.itemInfo.name+' / '+e.quantity).join(' ,\n'),
            amount:ele.PriceInfo.orderTotal, 
            customer:ele.PersonalInfo.fname+' '+ele.PersonalInfo.lname,
            phonenum:ele.PersonalInfo.phoneNumber,
            ptype:ele.PaymentInfo.type,
            transaction:ele.PaymentInfo.transactionId,
            payments:ele.PaymentInfo.details.map(e=>e.id).join(' ,\n'),
            shipto:ele.ShippingInfo.address.address1+' \n'+ele.ShippingInfo.address.address2+' \n'+ele.ShippingInfo.address.city+' \n'+ele.ShippingInfo.address.state+', '+ele.ShippingInfo.address.country+' \n'+ele.ShippingInfo.address.pincode
        });

        count = count+1;
    });

    var payments = [].concat(...data.map(e=>e.PaymentInfo.details))
    var paymentWorkSheet = workbook.addWorksheet('Payment');
    paymentWorkSheet.columns = [
        { header: 'S.No', key: 'id', width: 10, style:{font:{bold:true}}},
        { header: 'Id', key: 'pid', width: 32 }
    ];
    count = 1;
    payments.forEach(ele => {
        paymentWorkSheet.addRow({ 
            id: count, 
            pid: ele.id
        });
        count = count+1;
    });


    return workbook;
}

module.exports={
    mapOrders2Resposne:_mapOrders2Resposne,
    mapOrder2Resposne:_mapOrder2Resposne,
    downloadOrders:_downloadOrders
}