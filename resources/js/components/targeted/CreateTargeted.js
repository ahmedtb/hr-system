import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../utility/ApiEndpoints'
import logError from '../utility/logError'
export default function CreateTargeted() {
    const [documents, setdocuments] = React.useState([])
    const [name, setname] = React.useState(null)
    const [address, setaddress] = React.useState(null)
    const [phone_number, setphone_number] = React.useState(null)
    const [email, setemail] = React.useState(null)
    const [description, setdescription] = React.useState(null)

    
    async function submit() {
        try {
            const data = new FormData()
            documents.forEach(image => {
                data.append('documents[]', image)
            });

            if (name) data.append('name', name)
            if (address) data.append('address', address)
            if (phone_number) data.append('phone_number', phone_number)
            if (email) data.append('email', email)
            if (description) data.append('description', description)

            const res = await axios.post(ApiEndpoints.createTargeted, data)
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }

    return (
        <div className="card">
            <div className="card-header">اضافة فرد مستهدف</div>

            <div className="card-body row">


                <div className="col-2 p-2 border rounded m-2 text-center">
                    <label className="">صورة للمستهدف</label>
                    <img height='100' onClick={() => { }} src={'/css/profile.png'} />
                </div>

                <div className="col-10 row d-flex align-items-start">

                    <div className="col-5 p-2 border rounded m-2 row ">
                        <label className="col-4 p-0">اسم المستهدف</label>
                        <input className="col-8"  onChange={(e) => setname(e.target.value)} type="text" />
                    </div>
                    <div className="col-5 p-2 border rounded m-2 row">
                        <label className="col-4 p-0">عنوان المستهدف</label>
                        <input className="col-8"  onChange={(e) => setaddress(e.target.value)} type="text" />
                    </div>
                    <div className="col-5 p-2 border rounded m-2 row">
                        <label className="col-5 p-0">رقم هاتف المستهدف</label>
                        <input className="col-7"  onChange={(e) => setphone_number(e.target.value)} name="phone_number" type="number" />
                    </div>
                    <div className="col-5 p-2 border rounded m-2 row">
                        <label className="col-4  p-0">بريده الالكتروني</label>
                        <input className="col-8"  onChange={(e) => setemail(e.target.value)} type="email" name="email" />
                    </div>
                </div>
                <div className="col-12 row d-flex align-items-start">
                    <div className="col-5 p-2 border rounded m-2">
                        <label className="col">وصف او ملاحظات</label>
                        <textarea className="col" rows="4"  onChange={(e) => setdescription(e.target.value)} type="text" />
                    </div>

                    <div className="col-5 p-2 border rounded m-2 row">
                        <label className="col-5 p-0">مستندات تخص المستهدف</label>
                        <input className="col-5 p-0" onChange={(e) => {
                            let array = []
                            for (var i = 0; i < e.target.files.length; i++) {
                                let file = e.target.files[i];
                                array.push(file);
                            }
                            setdocuments(array)
                        }} type="file" accept="image/*" multiple />
                    </div>
                    
                </div>
                <div className="col-12 p-2 m-2 d-flex justify-content-center">
                    <input onClick={submit} type="button" value="تسجيل" />
                </div>
            </div>
        </div>
    )
}