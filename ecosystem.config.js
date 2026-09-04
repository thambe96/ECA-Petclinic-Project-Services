module.exports = {
  apps : [
    {
      name   : "doctor-service",
      script : "java -jar doctor-service/target/doctor-service-1.0.0.jar",
      log_file: "./logs/doctor-service.log",
      instances: 2
    },
    {
      name   : "pet-service",
      script : "java -jar pet-service/target/pet-service-1.0.0.jar",
      log_file: "./logs/pet-service.log",
      instances: 2
    },
    {
      name   : "appointment-service",
      script : "java -jar appointment-service/target/appointment-service-1.0.0.jar",
      log_file: "./logs/appointment-service.log",
      instances: 2
    }
  ]
}
