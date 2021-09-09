import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import CustomModal from '../../components/CustomModal'
import { Redirect } from 'react-router'

export default function EditIndividualModal(props) {
    const individual = props.individual
    const change = props.change

    const [name, setname] = React.useState('')
    const [address, setaddress] = React.useState('')
    const [phone_number, setphone_number] = React.useState('')
    const [email, setemail] = React.useState('')
    const [description, setdescription] = React.useState('')

    React.useEffect(() => {
        if (individual) {
            setname(individual?.name)
            setaddress(individual?.address);
            setphone_number(individual?.phone_number);
            setemail(individual?.email);
            setdescription(individual?.description);
        }
    }, [individual])

    async function submit() {
        try {
            const res = await axios.put(ApiEndpoints.editIndividual.replace(':id', individual.id), {
                id: individual.id,
                name: name,
                address: address,
                phone_number: phone_number,
                email: email,
                description: description
            })
            console.log(res.data)
            change()
        } catch (error) {
            logError(error)
        }
    }

    return (
        <>
            <CustomModal buttonClass="btn btn-secondary" label={'تعديل ملف المستهدف'}>

                <div className="row">
                    <div className="col-2 p-2 border rounded m-2 text-center">
                        <label className="">صورة للمستهدف</label>
                        <img height='100' onClick={() => { }} src={'/css/profile.png'} />
                    </div>

                    <div className="col-10 row d-flex align-items-start">

                        <div className="col-5 p-2 border rounded m-2 row ">
                            <label className="col-4 p-0">اسم المستهدف</label>
                            <input className="col-8" value={name} onChange={(e) => setname(e.target.value)} type="text" />
                        </div>
                        <div className="col-5 p-2 border rounded m-2 row">
                            <label className="col-4 p-0">عنوان المستهدف</label>
                            <input className="col-8" value={address} onChange={(e) => setaddress(e.target.value)} type="text" />
                        </div>
                        <div className="col-5 p-2 border rounded m-2 row">
                            <label className="col-5 p-0">رقم هاتف المستهدف</label>
                            <input className="col-7" value={phone_number} onChange={(e) => setphone_number(e.target.value)} type="text" />
                        </div>
                        <div className="col-5 p-2 border rounded m-2 row">
                            <label className="col-4  p-0">بريده الالكتروني</label>
                            <input className="col-8" value={email} onChange={(e) => setemail(e.target.value)} type="email" name="email" />
                        </div>
                    </div>
                    <div className="col-12 row d-flex align-items-start">
                        <div className="col-5 p-2 border rounded m-2">
                            <label className="col">وصف او ملاحظات</label>
                            <textarea value={description} className="col" rows="4" onChange={(e) => setdescription(e.target.value)} type="text" />
                        </div>


                    </div>
                    <div className="col-12 p-2 m-2 d-flex justify-content-center">
                        <input  data-dismiss="modal" onClick={submit} type="button" value="تسجيل" />
                    </div>

                </div>

            </CustomModal>
        </>
    )
}