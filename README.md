# Project Name

OFFICE HUB
## Table of Contents

- [Description](#description)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)

## Description

The aim of this project was to design and develop a Smart office that can effectively manage documents and employees streamline and the document-related processes in an organization. The OFFICE HUB is an online platform that enables users to upload, store, share, Approve and manage their documents securely in a centralized location. The system includes features such as access control, document search, document sharing, Team Creation, Chating with Team Members, Project status and Workflow Automation. which improve collaboration and communication within the organization. The project involved conducting extensive research on existing SMART OFFICE solutions, analyzing user requirements, and developing a system architecture and user interface that meets the needs of the users. 

## Requirements

Hardware Requirements: 
Following are the hardware requirements to build this website.
1. A device like laptop or pc.
2. RAM of 4GB
3. Storage of atleast 1GB

Software Requirements:
Following are the software requirements to build this website.
1. Updated chrome or other browser(chrome is highly recommended).
2. MongoDb Compass for database
3. For running locally use localhost

## Installation

1. First you need to install all packages using npm i command
2. You need to create database in mongodb compass in atlash database name: officehub
3. run app.js file or simply write command npm run dev, now server is listining on port 3000
4. change connection.js url with your mongodb database url, now you need only to refresh your compass it will automatically import collection schemas
5. Now you need to create one folder in main directory name: userfiles, inside this create this folders: file,font,html,image,pdf,video. now create another folder in main directory: name as upload. this for storing documents.
6. Now project is ready, login(get login id pass from user collection in database) and use

## Usage

1. Contain two sides in one web, user/admin
2. when login threw admin account gives features of Team Creation, Admin profile change, add admin, add Employee, Document Approval and Team Management.
3. when login threw user account gives features of team joining, Document uploading, Document Searching/Downloading, Access Control, Chat with members, Update therir project status, Send project for approval Process.


