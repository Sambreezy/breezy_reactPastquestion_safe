import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  uploadpquestionValue,
  uploadPquestion,
  imgdocValue,
  getpastQuestion,
  searchpastQuestion,
  getprevpastQuestion,
  onFileChange
} from '../../actions/UploadPquestionActions';
import { connect } from 'react-redux';
import { isNull } from 'util';

class Dashboard extends Component {
  componentWillMount() {
    this.props.getpastQuestion();
  }

  submit = e => {
    e.preventDefault();
    let {
      course_name,
      school,
      year,
      course_code,
      department,
      semester,
      images,
      docs
    } = this.props;

    let form_data = new FormData();
    const imagess = [...images];
    const docss = [...docs];

    imagess.forEach((image, i) => {
      form_data.append('photos[]', image, image.name);
    });
    docss.forEach((doc, i) => {
      form_data.append('docs[]', doc, doc.name);
    });
    form_data.append('course_code', course_code);
    form_data.append('course_name', course_name);
    form_data.append('school', school);
    form_data.append('year', year);
    form_data.append('department', department);
    form_data.append('semester', semester);
    this.props.uploadPquestion(form_data);
  };

  search = e => {
    const { search } = this.props;
    this.props.searchpastQuestion(search);
    e.preventDefault();
  };

  prev = e => {
    const { prev } = this.props;
    this.props.getprevpastQuestion(prev);
    e.preventDefault();
  };

  next = e => {
    const { next } = this.props;
    this.props.getprevpastQuestion(next);
    e.preventDefault();
  };
  render() {
    const {
      course_name,
      year,
      course_code,
      school,
      department,
      semester,
      questions,
      prev,
      next,
      search,
      results,
      results_state
    } = this.props;

    console.log(results);

    return (
      <div className="landing-page sidebar-collapse">
        <div
          className="page-header header-filter"
          data-parallax="true"
          style={{
            backgroundImage: 'url("../assets/img/profile_city.jpg")',
            height: 450
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div id="buttons" className="cd-section">
                  <form>
                    <div className="input-group input-group-lg">
                      <input
                        type="text"
                        name="search"
                        className="form-control"
                        value={search}
                        required
                        placeholder="Search Question Papers..."
                        onChange={e =>
                          this.props.uploadpquestionValue({
                            props: e.target.name,
                            value: e.target.value
                          })
                        }
                      />
                    </div>
                    <br />
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={this.search.bind(this)}
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            {results_state === true && results.length > 0 ? (
              <div className="section text-center">
                <div className="row">
                  <div className="col-md-8 ml-auto mr-auto">
                    <h2 className="title" style={{ paddingBottom: 15 }}>
                      Search Result{' '}
                    </h2>
                    <div className="description">
                      <div className="list-group">
                        {results.map(result => (
                          <Link
                            to={`dashboard/singleitem/${result.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <div className="list-group-item" key={result.id}>
                              <h4 className="list-group-item-heading">
                                {result.course_name}
                              </h4>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {result.course_code}
                              </p>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {result.semester} semester
                              </p>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {result.year}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div id="progress">
                        <ul className="pagination pagination-info mt-3">
                          <li className="page-item">
                            {prev === null ? (
                              <span>
                                <i className="fa fa-chevron-left" /> prev
                              </span>
                            ) : (
                              <span
                                onClick={this.prev.bind(this)}
                                className="page-link"
                                style={{ color: '#187bff' }}
                              >
                                <span className="fa fa-chevron-left" /> prev
                              </span>
                            )}
                          </li>
                          <li className="page-item">
                            {next === null ? (
                              <span>
                                next <i className="fa fa-chevron-right" />
                              </span>
                            ) : (
                              <span
                                onClick={this.next.bind(this)}
                                className="page-link"
                                style={{ color: '#187bff' }}
                              >
                                next <span className="fa fa-chevron-right" />
                              </span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : results_state === true && results.length === 0 ? (
              <div className="section">
                <div className="row">
                  <div className="col-md-8 ml-auto mr-auto">
                    <h2 className="text-center title">
                      Search Result Not Found
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="section text-center">
                <div className="row">
                  <div className="col-md-8 ml-auto mr-auto">
                    <h2 className="title" style={{ paddingBottom: 15 }}>
                      Recent Upload{' '}
                    </h2>
                    <div className="description">
                      <div className="list-group">
                        {questions.map(question => (
                          <Link
                            to={`dashboard/singleitem/${question.id}`}
                            style={{ textDecoration: 'none' }}
                          >
                            <div className="list-group-item " key={question.id}>
                              <h4 className="list-group-item-heading">
                                {question.course_name}
                              </h4>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {question.course_code}
                              </p>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {question.semester} semester
                              </p>
                              <p
                                className="list-group-item-text"
                                style={{ fontSize: 18 }}
                              >
                                {question.year}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div id="progress">
                        <ul className="pagination pagination-info mt-3">
                          <li className="page-item">
                            {isNull(prev) ? (
                              <span>
                                <i className="fa fa-chevron-left" /> prev
                              </span>
                            ) : (
                              <span
                                onClick={this.prev.bind(this)}
                                className="page-link"
                                style={{ color: '#187bff' }}
                              >
                                <span className="fa fa-chevron-left" /> prev
                              </span>
                            )}
                          </li>
                          <li className="page-item">
                            {isNull(next) ? (
                              <span>
                                next <i className="fa fa-chevron-right" />
                              </span>
                            ) : (
                              <span
                                onClick={this.next.bind(this)}
                                className="page-link"
                                style={{ color: '#187bff' }}
                              >
                                next <span className="fa fa-chevron-right" />
                              </span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="section section-contacts">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                  <h2 className="text-center title">Upload Question Papers</h2>

                  <form className="contact-form">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Course Name
                          </label>
                          <input
                            required
                            type="text"
                            name="course_name"
                            className="form-control"
                            value={course_name}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Course Code
                          </label>
                          <input
                            required
                            type="text"
                            name="course_code"
                            className="form-control"
                            value={course_code}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">
                            Department
                          </label>
                          <input
                            required
                            type="text"
                            name="department"
                            className="form-control"
                            value={department}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Semester</label>
                          <input
                            required
                            type="text"
                            name="semester"
                            className="form-control"
                            value={semester}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-group">
                          <label className="bmd-label-floating">School</label>
                          <input
                            required
                            type="text"
                            name="school"
                            className="form-control"
                            value={school}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="bmd-label-floating">Year</label>
                          <input
                            required
                            type="text"
                            name="year"
                            className="form-control"
                            value={year}
                            onChange={e =>
                              this.props.uploadpquestionValue({
                                props: e.target.name,
                                value: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              style={{
                                backgroundColor: '#b256c1',
                                borderRadius: 8,
                                color: 'white'
                              }}
                            >
                              Images
                            </span>
                          </div>
                          <div className="custom-file">
                            <input
                              required
                              accept="image/*"
                              type="file"
                              name="images"
                              className="file-input"
                              id="inputGroupFile01"
                              onChange={e =>
                                this.props.onFileChange({
                                  props: e.target.name,
                                  value: e.target.files
                                })
                              }
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span
                              className="input-group-text"
                              style={{
                                backgroundColor: '#b256c1',
                                borderRadius: 8,
                                color: 'white'
                              }}
                            >
                              Docs
                            </span>
                          </div>
                          <div className="custom-file">
                            <input
                              required
                              accept=".doc, .docx, .pdf, .txt, .rtf"
                              type="file"
                              name="docs"
                              className="file-input"
                              id="inputGroupFile02"
                              onChange={e =>
                                this.props.onFileChange({
                                  props: e.target.name,
                                  value: e.target.files
                                })
                              }
                              multiple
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-4 ml-auto mr-auto text-center">
                        <button
                          className="btn btn-primary btn-raised"
                          style={{ marginTop: 25 }}
                          type="button"
                          onClick={this.submit.bind(this)}
                        >
                          Upload
                        </button>
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
  course_name: state.uploadpquestion.course_name,
  year: state.uploadpquestion.year,
  school: state.uploadpquestion.school,
  course_code: state.uploadpquestion.course_code,
  department: state.uploadpquestion.department,
  semester: state.uploadpquestion.semester,
  images: state.uploadpquestion.images,
  docs: state.uploadpquestion.docs,
  questions: state.uploadpquestion.questions,
  results_state: state.uploadpquestion.results_state,
  prev: state.uploadpquestion.prev,
  next: state.uploadpquestion.next,
  search: state.uploadpquestion.search,
  results: state.uploadpquestion.results
});

export default connect(
  mapStateToProps,
  {
    uploadpquestionValue,
    uploadPquestion,
    imgdocValue,
    getpastQuestion,
    searchpastQuestion,
    getprevpastQuestion,
    onFileChange
  }
)(Dashboard);
