import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { apiCall } from '../../apiCalls/apiCalls';
import { getPackage, paymentRoute, getUser, } from '../../apiCalls/apiRoutes';
import axios from 'axios';

export default function PricingPlace() {
  const [packages, setPackages] = React.useState([]);
  const [user, setUser] = React.useState({});
  const handleBuyNow = (id) => {
    apiCall("post", paymentRoute, { id: id }).then((res) => {
      console.log(res.data.data)
      window.location.href = res.data.data.URL;
    }
    ).catch((err) => {
      console.log(err)
    });
  };

  console.log(user);
  useEffect(() => {
    loadPackages();
    loadUser();
  }, []);

  const loadUser = () => {
    apiCall("post", getUser).then((res) => {
      setUser(res.data.data);
    }).catch((err) => {
      console.log(err)
    });
  }
  const loadPackages = () => {
    apiCall("post", getPackage).then((res) => {
      console.log(res.data.data)
      setPackages(res.data.data)
    }).catch((err) => {
      console.log(err)
    });
  }
  console.log(packages)
  return (<>
    <div className="Pricing_sec" id="pricing">
      <div className="Center">
        <h2>Pricing</h2>
        <p>
          Service Packages for every need. <br />
        </p>
        <div className="Line"></div>
        <Grid container spacing={2}>
          {packages.map((item, index) => (
            <Grid item xs={12} sm={6} md={4}>
              <div className="Basic">
                <h3>{item.packageName}</h3>
              </div>
              <div className="Dollar">
                <p>${item.packagePrice}</p>
              </div>
              <div className="Band">
                <p>Duration: <span>{item.packageDuration} days</span></p>
              </div>
              <div className="Band">
                <p>Number Of tests: <span>{item.numberOfTests}</span></p>
              </div>
              <div className="Band">
                <p>Support <span>24 Hours</span></p>
              </div>
              <div className="Band">
                <p>{item.support}</p>
              </div>
              <div className="Band last">
                <button onClick={() => handleBuyNow(item.id)}>Buy Now</button>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  </>
  )
}
