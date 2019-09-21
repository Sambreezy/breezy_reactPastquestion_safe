import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  getuserInfo,
  usereditValue,
  usereditPix,
  updatePix
} from '../../actions/UserActions';
import {
  getpastQuestion,
  deletepqsArray,
  deletePastquestion
} from '../../actions/UploadPquestionActions';
import { connect } from 'react-redux';
import { isNull } from 'util';

class User extends Component {
  componentWillMount() {
    const { id } = this.props.user;
    this.props.getuserInfo(id);
    this.props.getpastQuestion();
  }

  delete = e => {
    const { deletedPqs } = this.props;
    const { id } = this.props.user;
    let data = {
      past_questions: deletedPqs,
      _method: 'DELETE'
    };
    this.props.deletePastquestion(data, id);
    e.preventDefault();
  };

  onUserPix = e => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    this.createImage(files[0]);
  };
  createImage = file => {
    let reader = new FileReader();
    reader.onload = e => {
      this.props.usereditPix(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  proPix = e => {
    const { id } = this.props.user;
    const { userpix } = this.props;
    this.props.updatePix(userpix, id);

    e.preventDefault();
  };

  state = {
    image: null
  };

  handleImageChange = e => {
    this.setState({
      image: e.target.files[0]
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { id } = this.props.user;
    console.log(id);
    let form_data = new FormData();
    form_data.append('photos[]', this.state.image, this.state.image.name);
    form_data.append('id', id);
    let url = 'https://pastquestions.xyz/api/v1/user/edit';
    axios
      .post(url, form_data, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res.data);
        this.props.getuserInfo(id);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { singleuser, singleuserdocs, prev, next } = this.props;

    let singleuserpicturename = this.props.singleuserpicturename.replace(
      'public/profile/',
      'https://pastquestions.xyz/storage/profile/'
    );

    return (
      <div className="profile-page sidebar-collapse">
        <div
          className="page-header header-filter"
          data-parallax="true"
          style={{ backgroundImage: 'url("../assets/img/city-profile.jpg")' }}
        />

        <div className="main main-raised">
          <div className="profile-content">
            <div className="container">
              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  <div className="profile">
                    <div className="avatar">
                      <a href={singleuserpicturename} target="self">
                        <img
                          src={singleuserpicturename}
                          alt="Circle"
                          className="img-raised rounded-circle"
                          height="160"
                          width="180"
                        />
                      </a>
                      <i
                        style={{
                          position: 'relative',
                          bottom: 13,
                          right: 28,
                          cursor: 'pointer'
                        }}
                        className="fa fa-camera fa-lg"
                      />
                    </div>
                    <div className="name">
                      <h3 className="title">{singleuser.name}</h3>
                      <h6>{singleuser.phone}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="description text-center">
                <p style={{ fontSize: 16 }}>{singleuser.description}</p>
                <div style={{ paddingBottom: 8 }}>
                  <h6> {singleuser.votes} votes </h6>
                </div>
                <div id="buttons" className="cd-section">
                  <Link to={`/user/edit/${singleuser.id}`}>
                    <button className="btn btn-primary btn-sm">
                      Edit Profile
                    </button>
                  </Link>
                </div>
                <form className="contact-form" onSubmit={this.handleSubmit}>
                  <input
                    id="uploadpix"
                    type="file"
                    name="userpix"
                    onChange={this.handleImageChange}
                    accept="image/*"
                  />
                  <button type={`submit`}>upload</button>
                </form>
              </div>

              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  {singleuserdocs.length > 0 ? (
                    <form className="form">
                      <div style={{ paddingTop: 24 }}>
                        <h2 className="text-center title">
                          Uploaded Documents
                        </h2>
                        <div id="checkRadios" style={{ marginTop: -20 }}>
                          {singleuserdocs.map(singleuserdoc => (
                            <div className="form-check" key={singleuserdoc.id}>
                              <label className="form-check-label">
                                <input
                                  true
                                  name="singleuserdoc.id"
                                  value={singleuserdoc.id}
                                  className="form-check-input"
                                  onChange={e =>
                                    this.props.deletepqsArray(e.target.value)
                                  }
                                  type="checkbox"
                                />{' '}
                                {singleuserdoc.course_name}
                                <span className="form-check-sign">
                                  <span className="check" />
                                </span>
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="row">
                          <div className="col-md-2.5 ml-auto mr-auto">
                            <div id="buttons" class="cd-section">
                              <button
                                onClick={this.delete.bind(this)}
                                class="btn btn-primary btn-sm"
                                style={{ marginTop: 25 }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          id="progress"
                          style={{ marginTop: 9, paddingBottom: 40 }}
                        >
                          <ul className="pagination pagination-info mt-3">
                            <li className="page-item">
                              {isNull(prev) ? (
                                <span>
                                  <i className="fa fa-chevron-left" /> prev
                                </span>
                              ) : (
                                <Link
                                  to={prev}
                                  className="page-link"
                                  style={{ color: '#187bff' }}
                                >
                                  <span className="fa fa-chevron-left" /> prev
                                </Link>
                              )}
                            </li>
                            <li className="page-item">
                              {isNull(next) ? (
                                <span>
                                  next <i className="fa fa-chevron-right" />
                                </span>
                              ) : (
                                <Link
                                  to={next}
                                  className="page-link"
                                  style={{ color: '#187bff' }}
                                >
                                  next <span className="fa fa-chevron-right" />
                                </Link>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div style={{ paddingTop: 24 }}>
                      <h2 className="text-center title">
                        No Uploaded Documents
                      </h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer footer-default">
          <div className="container">
            <nav className="float-left"></nav>
            <div className="copyright float-right">ExamPaperOnline © 2019</div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  deletedPqs: state.uploadpquestion.deletedPqs,
  user: state.login.user,
  userpix: state.user.userpix,
  singleuser: state.user.singleuser,
  singleuserpicturename: state.user.singleuserpicturename,
  singleuserdocs: state.user.singleuserdocs,
  prev: state.uploadpquestion.prev,
  next: state.uploadpquestion.next
});

export default connect(
  mapStateToProps,
  {
    getuserInfo,
    getpastQuestion,
    deletepqsArray,
    deletePastquestion,
    usereditValue,
    usereditPix,
    updatePix
  }
)(User);
