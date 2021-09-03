import React from 'react'
import axios from 'axios'
import ApiEndpoints from '../../utility/ApiEndpoints'
import logError from '../../utility/logError'
import CustomModal from '../../components/CustomModal'

export default function EditEmployeeModal(props) {
    const Employee = props.Employee
    const [title, setTitle] = React.useState('')
    const [goals, setGoals] = React.useState('')
    const [period, setPeriod] = React.useState('')
    const [category, setcategory] = React.useState('')
    const [details, setdetails] = React.useState('')

    React.useEffect(() => {
        // console.log('Employee edit', Employee)
        if(Employee){
            setTitle(Employee?.title)
            setGoals(Employee?.goals);
            setPeriod(Employee?.period);
            setcategory(Employee?.category);
            setdetails(Employee?.details);
        }
    }, [Employee])

    async function submit() {
        try {
            // const data = new FormData()
            // data.append('id', Employee.id)
            // if (title) data.append('title', title)
            // if (goals) data.append('goals', goals)
            // if (period) data.append('period', period)
            // if (category) data.append('category', category)
            // if (details) data.append('details', details)

            const res = await axios.put(ApiEndpoints.editEmployee.replace(':id',Employee.id), {
                id: Employee.id,
                title: title,
                goals: goals,
                period: period,
                category: category,
                details: details,
            })
            console.log(res.data)
        } catch (error) {
            logError(error)
        }
    }


    return (
        <>
            <CustomModal buttonClass="btn btn-secondary" label={'تعديل ملف الموظف'}>

                {/* <div className="card">
                    <div className="card-header">تعديل حقيبة تدريبية رقم {Employee?.id}</div>

                    <div className="card-body row justify-content-center">

                        <div className="col-6">
                            <label htmlFor="title">عنوان البرنامج</label>
                            <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} name="title" type="text" id="title" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="goals">اهداف البرنامج</label>
                            <input className="form-control" value={goals} onChange={(e) => setGoals(e.target.value)} name="goals" type="text" id="goals" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="period">مدة البرنامج بالدقائق</label>
                            <input className="form-control" value={period} onChange={(e) => setPeriod(e.target.value)} name="period" type="number" id="period" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="category">تصنيف</label>
                            <input className="form-control" value={category} onChange={(e) => setcategory(e.target.value)} name="category" type="text" id="category" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="details">تفاصيل حول البرنامج</label>
                            <textarea rows="5" className="form-control" value={details} onChange={(e) => setdetails(e.target.value)} name="details" type="text" id="details" />
                        </div>


                        <div className="col-2">
                            <button type="button" className="btn btn-success"  data-dismiss="modal" onClick={submit} type="button" value="تسجيل">
                                تعديل
                            </button>
                        </div>

                    </div>
                </div> */}
            </CustomModal>
        </>
    )
}