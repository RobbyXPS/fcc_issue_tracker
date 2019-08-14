    # Information Security and Quality Assurance Projects - Issue Tracker

### _User stories_

1. Prevent cross site scripting(XSS attack).
2. I can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
3. The object saved (and returned) will include all of those fields (blank for optional no input) and also include created_on(date/time), updated_on(date/time), open(boolean, true for open, false for closed), and _id.
4. I can PUT /api/issues/{projectname} with a _id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update updated_on. If no fields are sent return 'no updated field sent'.
5. I can DELETE /api/issues/{projectname} with a _id to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.
6. I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
7. I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want. (note: not present in my project UI but tests show functionality)
8. All 11 functional tests are complete and passing.

#### Companion app to test with
- https://pricey-hugger.glitch.me/

  <br>
  <br>
  <br>
  <br>

### _Technology and how it was used_

#### Security features (Helmet JS)
    WHAT: xssFilter
        - HOW: Prevents XSS acctcks via header setting.
            - WHY: Cross-site scripting, abbreviated to “XSS”, is a way attackers gain control over the users browser with Javascript. Once they have control they can: log your actions, impersonate you, steal your authentication cookies, and much more.

#### Back-End features (Node + Express)

    - CRUD endpoints to handle board/issue data.

#### Front-End features (HTML + AJAX + BOOTSTRAP)

    - Front-End > Back-End communication via AJAX requests for dynamic data generation.
    - Responsive design via HTML and mobile first Bootstrap library. 

#### Database

    - MongoDB managed in the cloud via https://www.mongodb.com/cloud.
    - Mongoose ODM (Object Document Mapper) used to make DB interactions more graceful. 

#### Test

    - Basic API tests written with Chai testing framework.