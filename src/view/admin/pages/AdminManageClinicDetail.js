import {Link, useNavigate, useParams} from "react-router-dom";
import axios from '../../../plugins/axios'
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";


const AdminManageClinicDetail = () => {
    const params = useParams();
    const [data, setData] = useState({})
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [isUpdate, setIsUpdate] = useState(false);
    
    const getData = () => {
        axios.get('/hospital/admin/get-clinic-detail/' + params.id).then((response) => {
            const data = JSON.parse(atob(response.data))
            setData(data.clinic)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        reset(data);
    }, [data]);

    const onSubmit = (data) => {
        const payload = {
            id: data.id,
            name: data.name,
            address: data.address,
            phone: data.phone,
        }

        axios.post('/hospital/admin/update-clinic', payload)
            .then((response) => {
                const data = JSON.parse(atob(response.data))
                setData(data.clinic)
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
                <Link to="/admin/manage-clinic">
                    <button className="btn btn-secondary">Trở về</button>
                </Link>
            </div>}
            <h5>Thông tin chi nhánh:</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Tên chi nhánh *</label>
                            <input
                                disabled={!isUpdate}
                                className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                {...register("name", {required: 'Tên chi nhánh là bắt buộc!'})}
                            />
                            <p style={{color: "red"}}>{errors.name?.message}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Địa chỉ chi nhánh *</label>
                            <input type="text"
                                   disabled={!isUpdate}
                                   className={errors.address ? 'form-control is-invalid' : 'form-control'}
                                   {...register("address", {
                                       required: 'Địa chỉ chi nhánh là bắt buộc!',
                                   })}
                            />
                            <p style={{color: "red"}}>{errors.address?.message}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Số điện thoại chi nhánh *</label>
                            <input type="text"
                                   disabled={!isUpdate}
                                   className={errors.phone ? 'form-control is-invalid' : 'form-control'}
                                   {...register("phone", {
                                       required: 'Số điện thoại chi nhánh là bắt buộc!',
                                   })}
                            />
                            <p style={{color: "red"}}>{errors.phone?.message}</p>
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

export default AdminManageClinicDetail