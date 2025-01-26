import { useSelector } from "react-redux";
import Loader from "../../compenents/loader/index"
import Error from "../../compenents/error/index"
import Card from "../../compenents/card/index"
import "./home.scss";





const Home = () => {

  const { jobs, isLoading, error } = useSelector((store) => store.jobSlice);


  const grouped = jobs.reduce((grouped, job) => {
    // eğer yeni oluşturuğumuz nesnede status'e karşılık gelen bir dizi yoksa boş bir dizi oluştur
    if (!grouped[job.status]) {
      grouped[job.status] = [];
    }

    // iş'in status değerine karşılık gelen diziye işi pushla
    grouped[job.status].push(job);

    // nesnenin son halini reutrn et
    return grouped;
  }, {});



  return (
    <div className="home-page">
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Error info={error} />
    ) : (
      <div className="layout">
        {/*
         * Sorun:
         Grouped nesnesi içerisindeki bütün dizileri dönüp ekrana  basmak isiyoruz

         * Çözüm:
         Object.keys() yöntemiyle Nesnenin anahtar değerlerinden bir dizi oluşturduk. Oluşturulan diziyi döndükten sonra nesnenin her bir anahtar değerine karşılık gelen nesne içerisindeki dizileri dönüp ekrana bastık 
        */}
        {Object.keys(grouped).map((status) => (
          <div key={status} className="group">
            <h1 className="title">
              {status} ({grouped[status].length})
            </h1>

            <div className="list">
              {grouped[status].map((job) => (
                <Card key={job.id} job={job} />
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default Home;