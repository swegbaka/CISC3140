There are several tables in database.In cars table it contains Car_ID,year, car_make, car_model
for Cars table schema is following:
CREATE TABLE Cars (
Car_ID INT PRIMARY KEY,
year INT,
make STRING,
model STRING,
name STRING);

For Judges table it contains Judge_ID, Judge_Name as original table variable, new update variables are start as first timestamp,
end as final timestamp, average as speed score calculated by duration divided by number of cars. As following:
CREATE TABLE Judges(
Judge_ID INT,
Judge_Name STRING,
start STRING,
end STRING,
average DOUBLE);


For Car_Score table it has score and carID :
CREATE TABLE Car_Score(
score INT,);


SQL script for database:
SELECT carID, year, make, model, (racer + racer2 + racer3 +racer4 +caroverall +engine +engP + engC + engD +engCL + bfu + bfs +bfc + bfd + bfcle + mp + mb + mw + mr + mi + mo + mice + ma + mwip +mover) AS Ranking_TotalScore
FROM Full
ORDER BY Ranking_TotalScore DESC
LIMIT 200 OFFSET 1



