import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course, Subject } from '@libs/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectManagementService {
  constructor(private readonly http: HttpClient) {}

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>('/api/subjects');
  }

  createSubject(subject: Partial<Subject>): Observable<Subject> {
    return this.http.post<Subject>('/api/subjects', subject);
  }

  updateSubject(id: string, subject: Partial<Subject>): Observable<Subject> {
    return this.http.put<Subject>(`/api/subjects/${id}`, subject);
  }

  deleteSubject(id: string): Observable<void> {
    return this.http.delete<void>(`/api/subjects/${id}`);
  }

  getCourses(subjectId: string): Observable<Course[]> {
    return this.http.get<Course[]>('/api/courses', { params: { subjectId } });
  }

  createCourse(course: Partial<Course>): Observable<Course> {
    return this.http.post<Course>('/api/courses', course);
  }

  updateCourse(id: string, course: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`/api/courses/${id}`, course);
  }

  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(`/api/courses/${id}`);
  }
}
