import { handleResponse } from "./utils";
import api from './api'

async function getCourses(){
  const response = await api.get(`/courses/get-battle-courses`);
  const responseHandled = handleResponse(response);
  return responseHandled
}

async function getAllCourses(currentPage, coursesPerPage, coursesOrder ){
  const response = await api.get(`/courses?page=${currentPage}&limit=${coursesPerPage}&order=${coursesOrder}`);
  const responseHandled = handleResponse(response);
  return responseHandled
}

async function deleteCourse(courseId){
  await api.delete(`/courses/${courseId}`);
}

async function getCourseTypes(){
  const response = await api.get(`/course_types`);
  const responseHandled = handleResponse(response);
  return responseHandled
}

async function updateCourse(courseId,data){
  const response = await api.patch(`/courses/${courseId}`, data)
  const responseHandled = handleResponse(response);
  return responseHandled
}
async function createCourse(data){
  const response = await api.post(`/courses`, data)
  const responseHandled = handleResponse(response);
  return responseHandled
}

async function getCourseById(courseId){
  const response = await api.get(`/courses/${courseId}`);
  const responseHandled = handleResponse(response);
  return responseHandled
}

async function getCourseQuestions(courseId){
  const response = await api.get(`/courses/${courseId}`)
  const responseHandled = handleResponse(response);
  return responseHandled
}

async function saveUserAnswer(questionAlternativeId){
  // /alternatives/save-user-answer
  const response = await api.post(`/alternatives/save-user-answer`,{ questionAlternativeId});
  const responseHandled = handleResponse(response);
  return responseHandled
}
export default {
  getCourses,
  getAllCourses,
  deleteCourse,
  getCourseTypes,
  updateCourse,
  createCourse,
  getCourseById,
  getCourseQuestions,
  saveUserAnswer
};
