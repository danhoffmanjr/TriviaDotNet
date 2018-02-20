SELECT q.*, a.*
FROM Questions q LEFT OUTER JOIN Answers a 
ON q.Id = a.QuestionId

SELECT * FROM AspNetUsers
SELECT * FROM AspNetUserClaims
INSERT INTO AspNetUserClaims 
(ClaimType, ClaimValue, UserId)
VALUES ('Administrator', 1, '54fb05d6-e7ba-478f-b4a3-e6442d7dd9a1');