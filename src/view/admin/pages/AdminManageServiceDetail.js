import {Link, useNavigate, useParams} from "react-router-dom";
import axios from '../../../plugins/axios'
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";


const AdminManageServiceDetail = () => {
    const params = useParams();
    const [data, setData] = useState({})
    const {register, handleSubmit, formState: {errors}, reset} = useForm();
    const [isUpdate, setIsUpdate] = useState(false);
    const [additionalInformation, setAdditionalInformation] = useState([{ key: '', reference_value: '', unit_value: '', value: '' }]);
    const handleAddAttribute = () => {
        setAdditionalInformation([...additionalInformation, { key: '',reference_value: '', unit_value: '', value: '' }]);
    };
    const handleRemoveAttribute = (index) => {
        const updatedInformation = [...additionalInformation];
        updatedInformation.splice(index, 1);
        setAdditionalInformation(updatedInformation);
    };
    const getData = () => {
        axios.get('/hospital/admin/get-service-detail/' + params.id).then((response) => {
            setData(response.data)
            setAdditionalInformation(response.data.additional_information)
        })
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        reset(data);
    }, [data]);

    const onSubmit = (data) => {
        if (additionalInformation.length === 0) {
            alert('Phải có ít nhất một thuộc tính của dịch vụ.');
            return;
        }
        const payload = {
            id: data.id,
            service_name: data.service_name,
            price: data.price,
            additional_information: additionalInformation
        }

        axios.post('/hospital/admin/update-service', payload)
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
                <Link to="/admin/manage-service">
                    <button className="btn btn-secondary">Trở về</button>
                </Link>
            </div>}
            <h5>Thông tin dịch vụ:</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Tên dịch vụ *</label>
                            <input
                                disabled={!isUpdate}
                                className={errors.name ? 'form-control is-invalid' : 'form-control'}
                                {...register("service_name", {required: 'Tên dịch vụ là bắt buộc!'})}
                            />
                            <p style={{color: "red"}}>{errors.name?.message}</p>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label">Giá dịch vụ *</label>
                            <input type="number"
                                   disabled={!isUpdate}
                                   className={errors.phone ? 'form-control is-invalid' : 'form-control'}
                                   {...register("price", {
                                       required: 'Giá dịch vụ là bắt buộc!',
                                   })}
                            />
                            <p style={{color: "red"}}>{errors.phone?.message}</p>
                        </div>
                    </div>
                    <div className="col-6">
                    <div className="mb-3">
                        <label className="form-label">Thiết bị thực hiện *</label>
                        <input type="text"
                               disabled={!isUpdate}
                               className={errors.driver_test ? 'form-control is-invalid' : 'form-control'}
                               {...register("driver_test", {
                                   required: 'Thiết bị thực hiện là bắt buộc!',
                               })}
                        />
                        <p style={{color: "red"}}>{errors.driver_test?.message}</p>
                    </div>
                    </div>
                    <div className="col-12">
                        <h5>Thuộc tính của dịch vụ:</h5>
                        <button className="btn btn-success mt-3" type="button" onClick={handleAddAttribute}>
                            Thêm thuộc tính
                        </button>
                        {additionalInformation.map((info, index) => (
                            <div key={index}>
                                <label>Chỉ số:</label>
                                <input
                                    type="text"
                                    value={info.key}
                                    onChange={(e) => {
                                        const updatedInfo = [...additionalInformation];
                                        updatedInfo[index].key = e.target.value;
                                        setAdditionalInformation(updatedInfo);
                                    }}
                                />
                                <label>Đơn vị:</label>
                                <input
                                    type="text"
                                    value={info.unit_value}
                                    onChange={(e) => {
                                        const updatedInfo = [...additionalInformation];
                                        updatedInfo[index].unit_value = e.target.value;
                                        setAdditionalInformation(updatedInfo);
                                    }}
                                />
                                <label>Trị số tham chiếu:</label>
                                <input
                                    type="text"
                                    value={info.reference_value}
                                    onChange={(e) => {
                                        const updatedInfo = [...additionalInformation];
                                        updatedInfo[index].reference_value = e.target.value;
                                        setAdditionalInformation(updatedInfo);
                                    }}
                                />
                                <button type="button" onClick={() => handleRemoveAttribute(index)}>
                                    Xóa
                                </button>
                            </div>
                        ))}
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

export default AdminManageServiceDetail