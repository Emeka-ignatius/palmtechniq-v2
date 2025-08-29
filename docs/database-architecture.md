# Database Architecture Flow

## Entity Relationship Overview

```mermaid
erDiagram
    User ||--o{ Student : "has profile"
    User ||--o{ Tutor : "has profile"
    User ||--o{ Admin : "has profile"
    
    User ||--o{ Course : "creates"
    User ||--o{ Enrollment : "enrolls in"
    User ||--o{ Review : "writes"
    User ||--o{ CartItem : "adds to cart"
    User ||--o{ Transaction : "makes payment"
    User ||--o{ Notification : "receives"
    User ||--o{ MentorshipSession : "student sessions"
    User ||--o{ MentorshipSession : "tutor sessions"
    
    Course ||--o{ CourseModule : "contains"
    Course ||--o{ Enrollment : "has enrollments"
    Course ||--o{ Review : "has reviews"
    Course ||--o{ Project : "has projects"
    Course ||--o{ Discussion : "has discussions"
    
    CourseModule ||--o{ Lesson : "contains"
    CourseModule ||--o{ Quiz : "contains"
    CourseModule ||--o{ Resource : "has resources"
    
    Lesson ||--o{ LessonProgress : "tracks progress"
    Quiz ||--o{ Question : "contains"
    Quiz ||--o{ QuizAttempt : "has attempts"
    
    Project ||--o{ Submission : "receives"
    
    Category ||--o{ Course : "categorizes"
    Category ||--o{ Category : "parent-child"
    
    Enrollment ||--o{ LessonProgress : "tracks"
    Enrollment ||--o{ QuizAttempt : "includes"
    
    Discussion ||--o{ DiscussionReply : "has replies"
