# Pet Clinic Microservices Core Services

## 👤 Student & Project Metadata

- **Student Name**: Oshadha Sankalpa Thambavita
- **Student Number**: 241711043
- **Slack Handle**: Oshadha Thambavita
- **GCP ID**: eca-petclinic-241711043

This repository contains the business domain microservices for the **Pet Clinic Application**. Built on **Spring Boot 3.4.3** and **Java 23**, these microservices integrate with **Spring Cloud Eureka** for service discovery and **Spring Cloud Config** for centralized configuration.

---

## 🏛 Microservices Overview

| Microservice | Primary Database | Key Features & Responsibilities |
| :--- | :--- | :--- |
| 🩺 **`doctor-service`** | **PostgreSQL** | Manages veterinary doctor profiles, specializations, contact info, and doctor photo uploads integrated with **Google Cloud Storage (GCS)**. |
| 🐾 **`pet-service`** | **MongoDB** | Manages pet records, animal types/species, age, owner contact details, and pet medical history metadata. |
| 📅 **`appointment-service`** | **MySQL** | Handles appointment scheduling, status workflows (`SCHEDULED`, `COMPLETED`, `CANCELLED`), and links pets with doctors. |

---

## 🛠 Tech Stack & Dependencies

- **Language & Framework**: Java 23, Spring Boot `3.4.3`, Spring Cloud `2024.0.0`
- **Service Discovery**: Spring Cloud Netflix Eureka Client
- **Configuration**: Spring Cloud Config Client
- **Boilerplate Reduction**: Lombok (`1.18.38`)
- **Cloud Integration**: Google Cloud Storage SDK (`2.46.0`) for doctor media assets
- **Data Persistence**:
  - `doctor-service`: Spring Data JPA + PostgreSQL Driver
  - `pet-service`: Spring Data MongoDB
  - `appointment-service`: Spring Data JPA + MySQL Connector/J

---

## 📁 Repository Structure

```text
services/
├── pom.xml                     # Parent Maven POM aggregating all 3 services
├── ecosystem.config.js         # PM2 cluster configuration (includes Cloud SQL Auth Proxy)
├── doctor-service/             # Doctor management service (PostgreSQL + GCS)
├── pet-service/                # Pet registry service (MongoDB)
└── appointment-service/        # Appointment scheduling service (MySQL)
```

---

## 🚀 Building & Running Locally

### Prerequisites
- **JDK 23** installed and configured in `JAVA_HOME`.
- **Apache Maven 3.8+**.
- Running instances of **PostgreSQL**, **MySQL**, **MongoDB**, and **Google Cloud SQL Auth Proxy** (if using GCP Cloud SQL).
- Running instances of **Service Registry** (Eureka) and **Config Server** (from `platform/`).

### 1. Build All Services
To compile and package all three microservices into executable JARs from the `services/` root:

```bash
mvn clean package -DskipTests
```

This will produce the built JAR files:
- `doctor-service/target/doctor-service-1.0.0.jar`
- `pet-service/target/pet-service-1.0.0.jar`
- `appointment-service/target/appointment-service-1.0.0.jar`

### 2. Running Individual Services
You can run any service independently via Maven:

```bash
# Run Doctor Service
cd doctor-service && mvn spring-boot:run

# Run Pet Service
cd pet-service && mvn spring-boot:run

# Run Appointment Service
cd appointment-service && mvn spring-boot:run
```

---

## ⚙ PM2 Process Management

The repository includes a production-ready `ecosystem.config.js` for process orchestration using [PM2](https://pm2.keymetrics.io/):

### Ecosystem Highlights
- Launches **Google Cloud SQL Auth Proxy** to securely tunnel database requests.
- Runs **2 load-balanced instances** of each microservice (`doctor-service`, `pet-service`, `appointment-service`).
- Redirects logs to `./logs/` directory.

### PM2 Commands
```bash
# Start all microservices and proxy via PM2
pm2 start ecosystem.config.js

# Monitor running instances
pm2 status

# View aggregate logs
pm2 logs
```
