import {Link, useNavigate, useParams} from "react-router-dom";
import axios from '../../../plugins/axios'
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";


const AdminMangeUserDetail = () => {
    const params = useParams();
    const [data, setData] = useState({})
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [isUpdate, setIsUpdate] = useState(false);

    const getData = () => {
        axios.get('/hospital/admin/get-user-detail/' + params.id).then((response) => {
            setData(response.data)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        reset(data);
    }, [data]);
    let sexValue = isUpdate ? <>
        <input type="radio"
               className={errors.sex ? 'form-check-input is-invalid' : 'form-check-input'}
               {...register("sex", {required: 'Giới tính là bắt buộc!'})}
               value="1"
        />
        <label className="form-check-label"
               style={{marginLeft: "10px", marginRight: "100px"}}>Nam</label>

        <input type="radio"
               className={errors.sex ? 'form-check-input is-invalid' : 'form-check-input'}
               {...register("sex", {required: 'Giới tính là bắt buộc!'})}
               value="0"
        />
        <label className="form-check-label" style={{marginLeft: "10px"}}>Nữ</label>
        <p style={{color: "red"}}>{errors.sex?.message}</p>
    </> : (data.sex == 1 ? <label className="form-check-label"
                                  style={{marginLeft: "10px", marginRight: "100px"}}>Nam</label> :
        <label className="form-check-label"
               style={{marginLeft: "10px", marginRight: "100px"}}>Nữ</label>)

    const onSubmit = (data) => {
        const payload = {
            id: data.id,
            name: data.name,
            email: data.email,
            date: data.date,
            sex: data.sex,
        }
        axios.post('/hospital/admin/update-user', payload)
            .then((response) => {
            setData(response.data)
            setIsUpdate(false)
        })
            .catch(response => {
                alert(response.response.data.error.message)
            })
    };

    return(
        <div className="box">
            {!isUpdate && <div className="mb-3 hstack gap-3">
                <button className="btn btn-success ms-auto" onClick={() => {
                    setIsUpdate(true)
                }}>Chỉnh sửa thông tin
                </button>
                <Link to="/admin/manage-user">
                    <button className="btn btn-secondary">Trở về</button>
                </Link>
            </div>}
            <h5>Thông tin bệnh nhân:</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Số điện thoại</label>
                            <input type="number"
                                   disabled
                                   className={errors.phone ? 'form-control is-invalid' : 'form-control'}
                                   {...register("phone", {
                                       required: 'Số điện thoại là bắt buộc!',
                                       minLength: {value: 10, message: "Số điện thoại gồm 10 chữ số"},
                                       maxLength: {value: 11, message: "Số điện thoại gồm 10-11 chữ số!"}
                                   })}
                            />
                            <p style={{color: "red"}}>{errors.phone?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email"
                                   disabled={!isUpdate}
                                   className={errors.email ? 'form-control is-invalid' : 'form-control'}
                                   {...register("email", {
                                       required: 'Email là bắt buộc!',
                                       pattern: {
                                           value: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                           message: "Email không hợp lệ!"
                                       },
                                   })}
                            />
                            <p style={{color: "red"}}>{errors.email?.message}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input
                                disabled={!isUpdate}
                                className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                {...register("name", {required: 'Họ và tên là bắt buộc!'})}
                            />
                            <p style={{color: "red"}}>{errors.name?.message}</p>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày sinh</label>
                            <input type="date"
                                   disabled={!isUpdate}
                                   className={errors.date ? 'form-control is-invalid' : 'form-control'}
                                   {...register("date", {required: 'Ngày sinh là bắt buộc!'})}
                            />
                            <p style={{color: "red"}}>{errors.date?.message}</p>
                        </div>
                        <div className="mb-4">
                            <p className="form-label mb-3">Giới tính</p>
                            {sexValue}
                        </div>
                    </div>
                </div>
                <hr/>
                {isUpdate && <>
                    <button className="btn btn-success" type="submit">Cập nhật</button>
                    <button className="btn btn-secondary ms-3" type="button" onClick={() => {
                        setIsUpdate(false)
                        getData()
                    }}>Hủy
                    </button>
                </>
                }
            </form>



        </div>
    )
}

export default AdminMangeUserDetail