import React, { useState, useEffect, memo} from 'react'
import Layouts from '../components/Layouts';
import pp from '../images/profile.png'

const About = () => {
    const [adet, adediAta] = useState(0);

    return (
      <Layouts>
        <div className="jumbotron">
          <h1 className="display-4">CovidPanel<small class="text-muted">.net</small></h1>
          <p className="lead">SARS-COV-2 virüsünün sebep olduğu <u>COVID-19</u> salgınına ait dünya
             genelindeki anlık veri güncellemelerini; okunabilir görsel tablolar, grafikler ve
             harita üzerinde görüntülenmesini sağlayan, "tahminleme" fonksiyonu ile salgının ileriye dönük
             ulaşabileceği noktaları tahmin etmeyi amaçlayan bir web sitesidir. </p>
          <br></br>
          <h4>Kullanılan Teknolojiler & Kaynaklar</h4>
          <ul>
            <li><a href="https://tr.reactjs.org" target="_blank">ReactJS</a></li>
            <li><a href="https://github.com/NovelCOVID/API" target="_blank">Covel Novid API</a> - Veri Servisi</li>
            <li><a href="https://react-bootstrap.github.io" target="_blank">React Bootstrap</a> - Arayüz Kütüphanesi</li>
            <li><a href="https://github.com/react-bootstrap-table/react-bootstrap-table2" target="_blank">Bootstrap Table</a> - Arayüz Kütüphanesi</li>
            <li><a href="https://www.react-simple-maps.io" target="_blank">React Simple Maps</a> - Arayüz Kütüphanesi</li>
          </ul>
          <br/>
    		<div class="d-flex justify-content-center">
    		    <div class="card profile-card-3">
    		        <div class="background-block">
    		            <img src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="profile-sample1" class="background"/>
    		        </div>
    		        <div class="profile-thumb-block">
    		            <img src={pp} alt="profile-image" class="profile"/>
    		        </div>
    		        <div class="card-content">
                    <h2>Muhammed Fatih Aksu<small>Yazılım Mühendisi</small></h2>
                    <div class="icon-block"><a href="#"><i className="fa fa-facebook"></i></a><a href="#"> <i class="fa fa-twitter"></i></a><a href="#"> <i class="fa fa-google-plus"></i></a></div>
                    </div>
                </div>
    		</div>
        </div>
      </Layouts>
    );
}

export default memo(About);