// export interface CoursePartBase {
//   name: string;
//   exerciseCount: number;
//   // description?: string;
//   // kind: string;
// }

// export interface CoursePartBasic extends CoursePartBase {
//   name: "Fundamentals" | "Advanced";
//   description: string;
//   kind: "basic";
// }

// export interface CoursePartGroup extends CoursePartBase {
//   groupProjectCount: number;
//   kind: "groupProject";
// }

// export interface CoursePartSubmission extends CoursePartBase {
//   description: string;
//   exerciseSubmissionLink: string;
//   kind: "submission";
// }

// export interface CoursePartFour extends CoursePartBase {
//   description: string;
//   requirements: string[];
//   kind: "special";
// }

// export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartSubmission | CoursePartFour;

export interface User {
  token: string;
  username: string;
  name: string;
}

export type RepoOredrType = 'name' | 'stars'

export interface RepoType {
  id: number,
  user: string,
  repoName: string,
  description: string,
  url: string,
  stars: number,
  topics: string[],
  repoLink: string,
  commits: number
}

export enum TopicEnum {
  Crawler = 'crawler',
  ClimateChange = 'climatechange'
}

export interface TopicObjType {
  display: string,
  value: TopicEnum,
  btnRunTestId: string
}