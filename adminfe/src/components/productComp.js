import React from 'react';
import Utils from '../utils/utils'

const Categories = [{
    "name":"Fruits",
    "id":"cat100240030",
    "seoname":"fruits"
},{
    "name":"Vegetables",
    "id":"cat100240031",
    "seoname":"vegetables"
},{
    "name":"Herbs",
    "id":"cat100240032",
    "seoname":"herbs"
},{
    "name":"Dairy",
    "id":"cat100240033",
    "seoname":"dairy"
}
];

const Category = (data) => {
    var optionHtml = Categories.map((ele,k)=>{
        if(ele===0){
            return
        }
        return <option key={k} value={ele.id}>{ele.name}</option>
    })

    return <React.Fragment>
            Category : <select style={{width:'70%', display:'inline'}} name="categories" placeholder="Category" defaultValue={data.category}>
                {optionHtml}
            </select>
        </React.Fragment>
}

export const ProductForm = (data) =>{
    return <span>
        <div className="row justify-content-center">
            <div className="col col-md-6 col-11" style={{textAlign:'left', borderBottom:'black solid 1px'}}>
                <h5>Product Information</h5>
            </div>                                                               
        </div>
        <div className="row justify-content-center">
            <div className="col col-md-6 col-11" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                <form onSubmit={data.handleCreate}>
                    <input type="text" name="name" placeholder="Name - 1Kgs or 500Gms" style={{minWidth:'100%'}} required maxLength='100'/><br/><br/>
                    <textarea type="text" name="keywords" placeholder="Keywords for Product" style={{minWidth:'100%'}} required maxLength='500'/><br/><br/>
                    <textarea type="text" name="desc" placeholder="Description" style={{minWidth:'100%'}} required maxLength='500'/><br/><br/>
                    <input type="text" name="brand" placeholder="Brand Name" style={{minWidth:'100%'}} maxLength='40'/><br/><br/>
                    <span>₹</span><input type="number" name="price"  placeholder="Price (only numbers) " style={{minWidth:'98%'}} required maxLength='10'/><br/><br/>
                    <Category category=''/><br/><br/>
                    Active : <select style={{width:'70%', display:'inline'}} name="status" placeholder="status">
                        <option value="Inactive">Inactive</option>
                        <option value="active">Active</option>
                    </select><br/><br/>
                    <label className="custom-file-upload " style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                        <input type="file" accept="image/*" name="upload" style={{display:'none'}}/>
                        Upload Product Image
                    </label>
                    <div style={{width:'100%', textAlign:'right'}}>
                        <input type="submit" name="Next" value="Create" style={{width:'30%', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} className="btn-sitewide"/>
                    </div>
                </form>
                <br/>
            </div>                                                              
        </div>
    </span>
}

export const ProductEdit = (data) =>{
    console.log(data.product)
    return <span>
        <div className="row justify-content-center">
            <div className="col col-md-6 col-11" style={{textAlign:'left', borderBottom:'black solid 1px'}}>
                <h5>Product Information</h5>
            </div>                                                               
        </div>
        <div className="row justify-content-center">
            <div className="col col-md-6 col-11" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                <br/>
                <form onSubmit={data.handleUpdateProduct}>
                    <span><b>Id</b> : {data.product.Id}</span> 
                    <input type="text" name="name" placeholder="Name" style={{minWidth:'100%'}} defaultValue={data.product.name} required maxLength='100'/><br/><br/>
                    <textarea type="text" name="keywords" placeholder="Keywords for Product" defaultValue={data.product.keywords} style={{minWidth:'100%'}} required maxLength='500'/><br/><br/>
                    <textarea type="text" name="desc" placeholder="Description" defaultValue={data.product.desc} style={{minWidth:'100%'}} required maxLength='500'/><br/><br/>
                    <input type="text" name="brand" placeholder="Brand Name" defaultValue={data.product.brand} style={{minWidth:'100%'}} maxLength='40'/><br/><br/>
                    <span>₹</span><input type="number" name="price"  defaultValue={data.product.price} placeholder="Price (only numbers) " style={{minWidth:'98%'}} required maxLength='10'/><br/><br/>
                    <Category category={data.product.categories}/><br/><br/>
                    Active : <select style={{width:'70%', display:'inline'}} name="status" placeholder="status" defaultValue={data.product.status}>
                        <option value="Inactive">Inactive</option>
                        <option value="active">Active</option>
                    </select><br/><br/>
                    {data.product.image && <img src={"/prdimg/"+data.product.image} style={{width:'150px'}}/>}<br/>
                    <label className="custom-file-upload " style={{boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
                        <input type="file" accept="image/*" name="upload" style={{display:'none'}}/>
                        Upload Product Image
                    </label>
                    <div style={{width:'100%', textAlign:'right'}}>
                        <input type="hidden" value={data.product.Id} name="id"/>
                        <input type="submit" name="Next" value="Update" style={{width:'30%', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} className="btn-sitewide"/>
                    </div>
                </form>
                <br/>
            </div>                                                              
        </div>
    </span>
}

export const ProductList =(data)=>{
    return <span>
        {data && data.products && data.products.length > 0 && <div className="row justify-content-center">
            <div className="col col-md-3 col-5" style={{ textAlign: 'left', borderBottom: 'black solid 1px' }}>
                <h5>Products - {data.products.length}</h5>
            </div>
            <div className="col col-md-3 col-5" style={{ textAlign: 'right', borderBottom: 'black solid 1px' }}>
                <span onClick={data.handleDownload} style={{cursor:'pointer'}}>Download</span>
            </div>
        </div>}
        {data.products.map((e, i) => {
            return <div className="row justify-content-center" key={i}  >
                    <div className="col col-md-6 col-11" style={{ textAlign: 'left' }}>
                        <br />
                        <div style={{ borderRadius: '15px', border: 'black solid 1px', padding: '10px', cursor:'pointer'}}>
                            <div className="row justify-content-center" id={e.Id} onClick={data.handleProductEdit}>
                                <div className="col col-md-3 col-6">
                                    {e.image && <img src={"/prdimg/"+e.image} style={{ width: '100%' }} />}
                                </div>
                                <div className="col col-5" style={{ textAlign: 'left' }}>
                                    <span><b>{e.name}</b></span><br />
                                    <span>₹{e.price}</span><br />
                                    <span>{e.brand}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        })}
        {data && (!data.products || data.products.length === 0) && <span>
            No Product found, Please provide other keywords.
        </span>}

    </span>
}

export const ProductPublish = (data) =>{

    console.log(data.product.categories)
    console.log(Categories.filter(e=>e.id==data.product.categories))
    var catName = Categories.filter(e=>e.id==data.product.categories)[0].name
    // var sitecatName = Categories.filter(e=>e.id==data.siteProduct.categories)[0].name

    return <span>
    <div className="row justify-content-center">
        <div className="col col-md-6 col-11" style={{textAlign:'left', borderBottom:'black solid 1px'}}>
            <h5>Product Information</h5>
        </div>                                                               
    </div>
    <div className="row justify-content-center">
        <div className="col col-md-6 col-11" style={{textAlign:'left', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}}>
            <br/>
            <span><b>Name:</b> {data.product.name}</span><br/>
            <span><b>Keywords:</b> {data.product.keywords}</span><br/>
            <span><b>Description:</b> {data.product.desc}</span><br/>
            <span><b>Brand:</b> {data.product.brand}</span><br/>
            <span><b>Price:</b> ₹{data.product.price}</span><br/>
            <span><b>Category:</b> {catName}</span><br/>
            <span><b>Status:</b> {data.product.status}</span><br/>
            {data.product.image && <img src={"/prdimg/"+data.product.image} style={{width:'150px'}}/>}<br/>
            <form onSubmit={data.handlePublish}>
                <input type="hidden" name="id" value={data.product.Id}/>
                <div style={{width:'100%', textAlign:'right'}}>
                    <input type="submit" name="Next" value="Publish" style={{width:'30%', boxShadow: '0 4px 8px 0 rgba(28,32,36,.2)'}} className="btn-sitewide"/>
                </div>
            </form>
            <br/>
            <hr/>
            <h3>Product in Site</h3>
            <span><b>Name:</b> {data.siteProduct.name}</span><br/>
            <span><b>Keywords:</b> {data.siteProduct.keywords}</span><br/>
            <span><b>Description:</b> {data.siteProduct.desc}</span><br/>
            <span><b>Brand:</b> {data.siteProduct.brand}</span><br/>
            <span><b>Price:</b> ₹{data.siteProduct.price}</span><br/>
            {/* <span><b>Category:</b> {sitecatName}</span><br/> */}
            <span><b>Status:</b> {data.siteProduct.status}</span><br/>
            {data.product.image && <img src={"/prdimg/"+data.siteProduct.image} style={{width:'150px'}}/>}<br/><br/>
        </div>                                                              
    </div>
</span>
}