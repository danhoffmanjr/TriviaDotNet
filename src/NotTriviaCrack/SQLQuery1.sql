SELECT q.*, a.*
FROM Questions q LEFT OUTER JOIN Answers a 
ON q.Id = a.QuestionId