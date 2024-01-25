import "./css/media.css";
import "./css/theme.css";
import bannerImg from "./css/images/3.avif";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoTabs from "./tab";
import Login from "../LoginPages/login";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';


const handleSubmit = (event) => {
  event.preventDefault();
  window.location.href = 'mailto:Areilbk@gmail.com';
};


function Home({ loginCheck }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("loginCheck", loginCheck);
  }, [loginCheck]);

  return (

    <div class="DesignHolder" id='home'>
      <div class="LayoutFrame">
        <div class="Banner_sec" >
          <Grid mt={10} container className="bannerside-m">
            <Grid container item alignItems="center" justifyContent="center">
              <Grid item xs={12} md={6} p={10}>
                <div>
                  <Typography variant="h2" sx={{ color: "#000" }}>
                    Test Factory {' '} <br /><span style={{ color: "#ff9000", }}>How it works</span>
                  </Typography>
                  <Typography variant="h6" sx={{ mt: "10px" }}>
                    WITH OUR HELP YOU CAN FIND THE EMPLOYEE YOU ARE LOOKING FOR! Recruiting? Enter your email, Register in the
                  </Typography>
                  {/* <Button onClick={() => { navigate('/questionare') }}>Questionnaire</Button> */}
                </div>
              </Grid>
              <Grid item xs={12} md={6} mt={5}>
                {loginCheck ? (
                  <Login />
                ) : (
                  <div>
                    <img src={bannerImg} alt="Banner" />
                  </div>
                )}
              </Grid>

            </Grid>

          </Grid>
          <div id="about"></div>

          <div class="bgcolor"></div>
          <Grid container id="Container" justifyContent="center">
            <Grid item xs={12} md={8} mb={5}>
              <div className="About_sec" >
                <div className="Center">

                  <Typography variant="h2">about us</Typography>
                  <Typography variant="h5" sx={{ display: "flex", lineHeight: "35px" }}>
                    Today Every business can examine job candidates before choosing what to hire. Your business is taken seriously by the candidates. With the help of the website, you can easily find an honest salesperson who knows how important it is to meet goals. With the help of the website, you can find a caring secretary who will take the burden off you. And all easily and at good prices.
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
          <div id="services"></div>
          <br />
          <br />
          <br />
          <br />
          <InfoTabs />
          <div className="Services_sec" >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={12} sx={{ textAlign: 'center' }}>
                <div className="Center">
                  <h2>our Services</h2>
                  <p>Following are the services TestFactory is providing currently.</p>
                  <div className="Line"></div>
                </div>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" pl={10}>
              <Grid item xs={12} sm={6} md={3}>
                <div className="Serviceside">
                  <ul>
                    <li className="Development">
                      <a href="#services">
                        <h4>Intelligence Test</h4>
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className="Serviceside">
                  <ul>
                    <li className="Desdin">
                      <a href="#services">
                        <h4>Sales Test</h4>
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <div className="Serviceside">
                  <ul>
                    <li className="Concept">
                      <a href="#services">
                        <h4>Reliability test</h4>
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={3} >
                <div className="Serviceside">
                  <ul>
                    <li className="System">
                      <a href="#services">
                        <h4>Test in Hebrew</h4>
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>
            </Grid>
          </div>
          <div id="contact"></div>
          <div className="Pricing_sec">
            <div className="Center">
              <h2>Pricing</h2>
              <p>
                All plans come with unlimited disk space. Our support can be as quick as 15 minutes to get a response.
              </p>
              <div className="Line"></div>
              <br />
              <br />
              <Grid container spacing={2}>
                {/* Basic Plan */}
                <Grid item xs={12} sm={6} md={4}>
                  <div className="Basic">
                    <h5>Basic</h5>
                  </div>
                  <br />
                  <div className="Dollar">
                    <h4>$27.50</h4>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>2,000 GB <span>Bandwidth</span></h5>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>32 GB <span>memory</span></h5>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>Support <span>24 Hours</span></h5>
                  </div>
                  <br />

                  <div className="Band last">
                    <h5>Update <span>$20</span></h5>
                  </div>
                </Grid>

                {/* Biz Plan */}
                <Grid item xs={12} sm={6} md={4}>
                  <div className="Basic">
                    <h5>Biz</h5>
                  </div>
                  <br />
                  <div className="Dollar">
                    <h4>$44.50</h4>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>2,000 GB <span>Bandwidth</span></h5>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>32 GB <span>memory</span></h5>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>Support <span>24 Hours</span></h5>
                  </div>
                  <br />

                  <div className="Band last">
                    <h5>Update <span>$20</span></h5>
                  </div>
                </Grid>

                {/* Pro Plan */}
                <Grid item xs={12} sm={6} md={4}>
                  <div className="Basic">
                    <h5>Pro</h5>
                  </div>
                  <br />
                  <div className="Dollar">
                    <h4>$72.50</h4>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>2,000 GB <span>Bandwidth</span></h5>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>32 GB <span>memory</span></h5>
                  </div>
                  <br />

                  <div className="Band">
                    <h5>Support <span>24 Hours</span></h5>
                  </div>
                  <br />

                  <div className="Band last">
                    <h5>Update <span>$20</span></h5>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <br />
          <br />
          <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h5" gutterBottom>
                Contact Us
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Container>
          <br />






        </div>
      </div>
    </div>




  );
}

export default Home;
