import { handleResponse } from "./utils";
import api from "./api";

async function getCourses() {
  const response = await api.get(`/courses/get-battle-courses`);
  const responseHandled = handleResponse(response);
  return responseHandled;
}

async function getAllCourses(currentPage, coursesPerPage, coursesOrder) {
  const response = await api.get(
    `/courses?page=${currentPage}&limit=${coursesPerPage}&order=${coursesOrder}`
  );
  const responseHandled = handleResponse(response);
  return responseHandled;
}

async function deleteCourse(courseId) {
  await api.delete(`/courses/${courseId}`);
}

async function getCourseTypes() {
  const response = await api.get(`/course_types`);
  const responseHandled = handleResponse(response);
  return responseHandled;
}

async function updateCourse(courseId, data) {
  const response = await api.patch(`/courses/${courseId}`, data);
  const responseHandled = handleResponse(response);
  return responseHandled;
}
async function createCourse(data) {
  const response = await api.post(`/courses`, data);
  const responseHandled = handleResponse(response);
  return responseHandled;
}

async function getCourseById(courseId) {
  const response = await api.get(`/courses/${courseId}`);
  const responseHandled = handleResponse(response);
  return responseHandled;
}

async function getCourseQuestions(courseBattleId) {
  const response = await api.get(`/course_battles/${courseBattleId}`);
  const responseHandled = handleResponse(response);
  return responseHandled;
}

async function saveUserAnswer(
  questionAlternativeId,
  courseBattleId,
  questionId
) {
  const response = await api.post(`/alternatives/save-user-answer`, {
    questionAlternativeId,
    courseBattleId,
    questionId,
  });
  const responseHandled = handleResponse(response);
  return responseHandled;
}

async function createCourseBattle(courseBattle) {
  const response = await api.post("/course_battles", courseBattle);
  return response;
}
async function getCourseBattleUsers(courseBattleId) {
  const response = await api.get(
    `/course_battles/get-course-battle-users/${courseBattleId}`
  );
  return response;
}

async function registerUser({ courseBattleId, userId }) {
  const response = await api.post("/course_battles/register-user", {
    courseBattleId,
    userId,
  });
  return response;
}

async function getCourseBattleMessages(courseBattleId) {
  const response = await api.get(
    `/course_battles/get-course-battle-messages/${courseBattleId}`
  );
  return response;
}
async function sendCourseBattleMessage({ courseBattleId, userId, message }) {
  const response = await api.post(
    `/course_battles/send-course-battle-message`,
    { courseBattleId, userId, message }
  );
  return response;
}
async function finishCourseBattle({
  courseBattleId,
  courseId,
  userChosenAlternatives,
  timeSpent
}) {
  const response = await api.post(`/course_battles/finish-course-battle`, {
    courseBattleId,
    courseId,
    userChosenAlternatives,
    timeSpent
  });
  return response;
}
async function getUserCourseBattles() {
  const response = await api.get(
    `/course_battles`
  );
  return response;
}

async function getCourseBattleResult(courseBattleId){
  const response = await api.get(
    `/course_battles/result/${courseBattleId}`
  );
  return response;
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
  saveUserAnswer,
  createCourseBattle,
  getCourseBattleUsers,
  registerUser,
  getCourseBattleMessages,
  sendCourseBattleMessage,
  finishCourseBattle,
  getUserCourseBattles,
  getCourseBattleResult
};
