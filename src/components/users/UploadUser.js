import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getuserInfo } from '../../actions/UserActions';
import { connect } from 'react-redux';
import { isNull } from 'util';
import { withRouter } from 'react-router-dom';

class UploadUser extends Component {
  componentWillMount() {
    const { uploaded_by } = this.props.singleitem;
    this.props.getuserInfo(uploaded_by);
  }

  render() {
    const { singleuser, singleuserdocs, prev, next } = this.props;

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
                      <a
                        href="../../assets/img/faces/christian.jpg"
                        target="self"
                      >
                        <img
                          src="../assets/img/faces/christian.jpg"
                          alt="Circle"
                          className="img-raised rounded-circle img-fluid"
                        />
                      </a>
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
              </div>

              <div className="row">
                <div className="col-md-6 ml-auto mr-auto">
                  <form>
                    <div style={{ paddingTop: 24 }}>
                      <h2 className="text-center title">Uploaded Documents</h2>
                      <div className="text-center" style={{ marginTop: -20 }}>
                        {singleuserdocs.map(singleuserdoc => (
                          <Link
                            to={`dashboard/singleitem/${singleuserdoc.id}`}
                            style={{ textDecoration: 'none', color: 'black' }}
                          >
                            <div key={singleuserdoc.id}>
                              <span style={{ fontSize: 18 }}>
                                {singleuserdoc.course_name}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="row" style={{ marginTop: 12 }}>
                        <div className="col-md-2.5 ml-auto mr-auto">
                          <div id="progress" style={{ paddingBottom: 40 }}>
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
                                    next{' '}
                                    <span className="fa fa-chevron-right" />
                                  </Link>
                                )}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
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
  singleitem: state.uploadpquestion.singleitem,
  userpix: state.user.userpix,
  singleuser: state.user.singleuser,
  singleuserdocs: state.user.singleuserdocs,
  prev: state.uploadpquestion.prev,
  next: state.uploadpquestion.next
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getuserInfo
    }
  )(UploadUser)
);
