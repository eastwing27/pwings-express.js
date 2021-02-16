##Routes:

<**POST** api/auth/logout> - logs out.

<**POST** api/auth/register_login> - logs in or creates a new user. Creates a user session. Body is JSON. Example:

```javascript
{
	"email": "test@test.com",
	"name": "John Smith",
	"password": "SuperSecurePa$$word"
}
```

<**GET** api/users> - Returns full user list. Logged in users only.

<**GET** api/users/search/:searchString> - returns a list of users which have matches with searchString in their emails or names. Logged in users only.

<**GET** api/users/:email> - returns full user info. Available for :email owners and admins only.

<**PUT** api/users/refill/:amount> - Refills current user balance by :amount. Logged in users only. For testing purposes, each user can refill their balance without any limit.

<**GET** api/transactions> - Returns a list of both incoming and outgoing transactions. Logged in users only.

<**POST** api/new> - Creates a transaction record regardless of operation success. If the operation was rejected, stores the rejection reason. Sender must set reciever email. Logged in users only. Body is JSON. Example:

```javascript
{
	"reciever": "test@test.com",
	"amount": 10
}
```