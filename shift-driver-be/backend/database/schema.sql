CREATE DATABASE IF NOT EXISTS endurance_manager_dev

CREATE TABLE "Stint_Types"(
    "stint_type_id" BIGINT NOT NULL,
    "stint_name" VARCHAR(255) NOT NULL,
    "fuel_use" SMALLINT NOT NULL,
    "session_id" BIGINT NOT NULL
);
ALTER TABLE
    "Stint_Types" ADD PRIMARY KEY("stint_type_id");
CREATE TABLE "Stop_Types"(
    "stop_type_id" BIGINT NOT NULL,
    "stop_length" BIGINT NOT NULL,
    "session_id" BIGINT NOT NULL
);
ALTER TABLE
    "Stop_Types" ADD PRIMARY KEY("stop_type_id");
CREATE TABLE "Car_Information"(
    "car_id" BIGINT NOT NULL,
    "car_name" VARCHAR(100) NOT NULL,
    "fuel_tank_size" SMALLINT NOT NULL,
    "session_id" BIGINT NOT NULL
);
ALTER TABLE
    "Car_Information" ADD PRIMARY KEY("car_id");
COMMENT
ON COLUMN
    "Car_Information"."fuel_tank_size" IS 'in kilograms';
CREATE TABLE "Stints"(
    "id" BIGINT NOT NULL,
    "session_id" BIGINT NOT NULL,
    "stop_type_id" BIGINT NULL,
    "stint_type_id" BIGINT NULL,
    "predicted_end_time" BIGINT NOT NULL,
    "actual_end_time" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "predicted_laps" BIGINT NOT NULL,
    "actual_laps" BIGINT NULL,
    "driver_id" BIGINT NOT NULL
);
ALTER TABLE
    "Stints" ADD PRIMARY KEY("id");
CREATE TABLE "Stint_Lap_Times"(
    "driver_id" BIGINT NOT NULL,
    "stint_type_id" BIGINT NOT NULL,
    "lap_time" BIGINT NOT NULL
);
ALTER TABLE
    "Stint_Lap_Times" ADD PRIMARY KEY("driver_id");
ALTER TABLE
    "Stint_Lap_Times" ADD PRIMARY KEY("stint_type_id");
CREATE TABLE "Drivers"(
    "driver_id" BIGINT NOT NULL,
    "name" VARCHAR(100) NULL,
    "associated_uuid" UUID NULL,
    "time_zone" VARCHAR(40) NOT NULL,
    "session_id" BIGINT NOT NULL
);
ALTER TABLE
    "Drivers" ADD PRIMARY KEY("driver_id");
CREATE TABLE "Session_Info"(
    "session_id" BIGINT NOT NULL,
    "duration_is_laps" BOOLEAN NOT NULL DEFAULT '0',
    "session_start_game_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "session_start_real_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "practice_length" BIGINT NULL,
    "qualifying_length" BIGINT NULL,
    "race_length" BIGINT NULL
);
ALTER TABLE
    "Session_Info" ADD PRIMARY KEY("session_id");
COMMENT
ON COLUMN
    "Session_Info"."practice_length" IS 'in ms';
COMMENT
ON COLUMN
    "Session_Info"."qualifying_length" IS 'in ms';
COMMENT
ON COLUMN
    "Session_Info"."race_length" IS 'in ms';
ALTER TABLE
    "Stint_Lap_Times" ADD CONSTRAINT "stint_lap_times_stint_type_id_foreign" FOREIGN KEY("stint_type_id") REFERENCES "Stint_Types"("stint_type_id");
ALTER TABLE
    "Stints" ADD CONSTRAINT "stints_session_id_foreign" FOREIGN KEY("session_id") REFERENCES "Session_Info"("session_id");
ALTER TABLE
    "Stints" ADD CONSTRAINT "stints_stint_type_id_foreign" FOREIGN KEY("stint_type_id") REFERENCES "Stint_Types"("stint_type_id");
ALTER TABLE
    "Stint_Types" ADD CONSTRAINT "stint_types_session_id_foreign" FOREIGN KEY("session_id") REFERENCES "Session_Info"("session_id");
ALTER TABLE
    "Stints" ADD CONSTRAINT "stints_stop_type_id_foreign" FOREIGN KEY("stop_type_id") REFERENCES "Stop_Types"("stop_type_id");
ALTER TABLE
    "Stints" ADD CONSTRAINT "stints_driver_id_foreign" FOREIGN KEY("driver_id") REFERENCES "Drivers"("driver_id");
ALTER TABLE
    "Drivers" ADD CONSTRAINT "drivers_session_id_foreign" FOREIGN KEY("session_id") REFERENCES "Session_Info"("session_id");
ALTER TABLE
    "Stop_Types" ADD CONSTRAINT "stop_types_stop_type_id_foreign" FOREIGN KEY("stop_type_id") REFERENCES "Session_Info"("session_id");
ALTER TABLE
    "Car_Information" ADD CONSTRAINT "car_information_session_id_foreign" FOREIGN KEY("session_id") REFERENCES "Session_Info"("session_id");
ALTER TABLE
    "Stint_Lap_Times" ADD CONSTRAINT "stint_lap_times_driver_id_foreign" FOREIGN KEY("driver_id") REFERENCES "Drivers"("driver_id");