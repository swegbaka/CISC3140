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


For 2nd requirement:
WITH cte AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY t1.Score ORDER BY t2.FScore DESC) rn
  FROM Sample_Data t1 INNER JOIN Car_Score t2
  ON t2.ID = t1.ID
  WHERE t1.make IN ('Acura', 'Toyota','Audi', 'Benz','Bmw','Chevy','Chrystler','Civic','Dodge','Ford','Honda','Hyundai','Infiniti'
                    'Infinity','Jeep','Lexus','Mazda','Mercedes','Mitsu','Mitsub','Nissan','Scion','Subaru','Volkswagen','Volvo')
)
SELECT ID, Score, Name, FScore
FROM cte
WHERE rn <= 3;

For 3rd requirement:
start field for each judge:
SELECT time,judgename FROM Full WHERE judgename = 'Bob' ORDER BY time LIMIT 1; 
SELECT time,judgename FROM Full WHERE judgename = 'Carl' ORDER BY time LIMIT 1; 
SELECT time,judgename FROM Full WHERE judgename = 'Adrian' ORDER BY time LIMIT 1; 
SELECT time,judgename FROM Full WHERE judgename = 'Carol' ORDER BY time LIMIT 1; 
SELECT time,judgename FROM Full WHERE judgename = 'Aaron' ORDER BY time LIMIT 1; 
SELECT time,judgename FROM Full WHERE judgename = 'Dan' ORDER BY time LIMIT 1;
SELECT time,judgename FROM Full WHERE judgename = 'Danny' ORDER BY time LIMIT 1; 
SELECT time,judgename FROM Full WHERE judgename = 'Wayne' ORDER BY time LIMIT 1; 

end filed for each judge:
SELECT time,judgename FROM Full WHERE judgename = 'Bob' ORDER BY time DESC LIMIT 1;
SELECT time,judgename FROM Full WHERE judgename = 'Carl' ORDER BY time DESC LIMIT 1;
SELECT time,judgename FROM Full WHERE judgename = 'Adrian' ORDER BY time DESC LIMIT 1;
SELECT time,judgename FROM Full WHERE judgename = 'Carol' ORDER BY time DESC LIMIT 1;
SELECT time,judgename FROM Full WHERE judgename = 'Aaron' ORDER BY time DESC LIMIT 1;
SELECT time,judgename FROM Full WHERE judgename = 'Dan' ORDER BY time DESC LIMIT 1;
SELECT time,judgename FROM Full WHERE judgename = 'Danny' ORDER BY time DESC LIMIT 1;
SELECT time,judgename FROM Full WHERE judgename = 'Wayne' ORDER BY time DESC LIMIT 1;

AVERAGE FIELD:
UPDATE Judges
   SET average = round(((JULIANDAY(end) - JULIANDAY(start)) /
   (SELECT COUNT(judgename)FROM Sample_Data WHERE judgename = 'Aaron')), 4)
    WHERE Judge_Name IN ('Adrian','Aaron','Bob','Carl','Carol','Dan','Danny','Wayne'  ;

