import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import CustomModal from '../../components/CustomModal'

export default function EditCoachModal(props) {
    const coach = props.coach
    const change = props.change
    const [profileChoice, setProfileChoice] = React.useState('')
    function profileChoiceChange(e) {
        setProfileChoice(e.target.value)
    }

    const [id, setid] = React.useState('')
    const [CV, setCV] = React.useState('')
    const [speciality, setspeciality] = React.useState('')

    const submit = () => {

        axios.put(ApiEndpoints.editCoach.replace(':id', coach.id), {
            CV: CV, speciality: speciality,
            employee_id: profileChoice == 'employee' ? id : undefined,
            targeted_id: profileChoice == 'targeted' ? id : undefined,
        }).then((response) => {
            console.log(response.data)
            // setredirect(true)
        }).catch((err) => logError(err))

    }

    React.useEffect(() => {
        if (coach) {
            setid(coach.profile_id)
            setCV(coach.CV)
            setspeciality(coach.speciality)
        }
    }, [coach])


    return (
        <>
            <CustomModal buttonClass="btn btn-secondary" label={'تعديل البرنامج'}>

                <div className="card">
                    <div className="card-header">تعديل المدرب رقم {coach?.id}</div>

                    <div className="card-body row justify-content-center">

                        <div className="col-2 ">
                            <div className="p-2 border rounded m-2 text-center">
                                <label className="">صورة المدرب</label>
                                <img height='100' onClick={() => { }} src={'/css/profile.png'} />
                            </div>
                        </div>

                        <div className="col-10 row align-items-start">
                            
                            <div className="col-10 p-2 border rounded m-2 row ">
                                <label className="col-4">التخصص</label>
                                <input value={speciality} className="col-8  form-control" onChange={e => setspeciality(e.target.value)} type="text" />
                            </div>

                            <div className="col-10 p-2 border rounded m-2 row ">
                                <label className="col-4">السيرة الذاتية</label>
                                <textarea value={CV} className="col-8 form-control" onChange={e => setCV(e.target.value)} rows="5"></textarea>
                            </div>
                        </div>

                        <div className="col-8 text-center">
                            <input type="button" value="تعديل" onClick={submit} />
                        </div>


                    </div>
                </div>
            </CustomModal>
        </>
    )
}