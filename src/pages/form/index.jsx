import { useEffect, useState } from 'react';
import Input from "./input";
import { statusOptions, typeOptions } from "../../utils/constants";
import "./form.scss";
import { useNavigate, useParams } from 'react-router-dom';
import { getJob } from '../../utils/service';
import Api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { createJob, updateJob } from '../../redux/slicies/jobSlice';
import { toast } from 'react-toastify';


const Form = () => {

  const [editItem,setEditItem]= useState(null);


  const [status, setStatus] = useState(editItem?.status || "Mülakat");

    const dispatch = useDispatch();
      const navigate=  useNavigate();

  const { mode } =useParams();


  useEffect(() => {
    // oluşturma modunda: fonksiyon dursun
    if (mode === "create") return setEditItem(null);

    // güncelleme modunda: elemanın bilgilerini al
    getJob(mode).then((data) => {
      setEditItem(data);
      setStatus(data.status);
      
    });
  }, [mode]);


  

  const handleSubmit = (e) => {
    // sayfa yenilenmesini engelle
    e.preventDefault();

    // formdaki veirleri bir nesne içersinde kaydet
    const formData = new FormData(e.target);
    const jobData = Object.fromEntries(formData.entries());

    if(!editItem){
      Api.post("/jobs",jobData)
      .then((res)=>{
        dispatch(createJob(res.data));

        navigate("/");
        toast.success("başvurunuz oluşturuldu");
      })
      .catch((err)=>{
        toast.error("başvurunuz başarısız oldu");
      })
    }
    else{
      Api.patch(`/jobs/${editItem.id}`,jobData)
      .then((res)=>{
        dispatch(updateJob(res.data));
        navigate("/");
        toast.success("güncelleme başarılı");
      })
      .catch((err)=>
      {
        toast.error("güncelleme başarısız");
      })
    }

  };


  const dateName =
  editItem?.status === "Mülakat"
    ? "interview_date"
    : editItem?.status === "Reddedildi"
    ? "rejection_date"
    : "date";

const dateValue =
  editItem &&
  new Date(editItem[dateName])
    .toISOString()
    .slice(0, editItem.status === "Mülakat" ? 16 : 10);


  return (
    <div>
     
    <div className="create-page">
      <section>
      <h2>{editItem ? "Başvuruyu Güncelle" : " Yeni Başvuru Oluştur"}</h2>

        <form onSubmit={handleSubmit}>
          <Input label="Pozisyon" name="position" value={editItem?.position} />

          <Input label="Şirket" name="company"value={editItem?.company}  />

          <Input label="Lokasyon" name="location"value={editItem?.location}  />

          <Input
            label="Durum"
            name="status"
            options={statusOptions}
            handleChange={(e) => setStatus(e.target.value)}
            value={editItem?.status}
          />

          <Input label="Tür" name="type" options={typeOptions} value={editItem?.type}   />

          {/* TODO status değerine göre label ve name değerlerini değiştir */}
          <Input
            label={
              status === "Mülakat"
                ? "Mülakat Tarihi"
                : status === "Reddedildi"
                ? "Reddedilme Tarihi"
                : "Başvuru Tarihi"
            }
            name={
              status === "Mülakat"
                ? "interview_date"
                : status === "Reddedildi"
                ? "rejection_date"
                : "date"
            }
            type={status === "Mülakat" ? "datetime-local" : "date"}
            value={dateValue}
          />

          <div className="btn-wrapper">
          <button>{editItem ? "Kaydet" : "Oluştur"}</button>

          </div>
        </form>
      </section>
    </div>

    </div>
  );
}

export default Form;