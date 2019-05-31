import api from "./api";

export function getUniversitiesByType(type) {
  return api.get(`/get-universities-by-type?uni_type=${type}`);
}

export function getUniversityByCode(code) {
  return api.get(`/get-university-by-code?code=${code}`);
}

export function getSpecialties(subject) {
  return api.get(`/get-by-subject?subject=${subject}&quota=false&lang=KZ`);
}

export function getSpecialtiesByCode(code, quota) {
  return api.get(`/get-by-code?code=${code}&quota=${quota}&lang=KZ`);
}

export function getSpecialtiesBySubject(subject, quota) {
  return api.get(`/get-by-subject?subject=${subject}&quota=${quota}&lang=KZ`);
}
