rules_version = '2';
service cloud.firestore
{
    match/databases/{database}
    /documents {

    function isAuthenticated() {
        return request.auth.uid != null;
    }

    function isAdmin() {
        return isAuthenticated() &&
            get(/databases/
        $(database)/documents/roles/$(request.auth.uid)
    ).
        data.role == 'admin';
    }

    function isKnownUser() {
        return isAuthenticated() &&
            exists(/databases/
        $(database)/documents/users/$(request.auth.uid)
    )
        ;
    }


    function isOwner(userId) {
        return request.auth.uid == userId
    }


    match/users/{userId}
    {
        allow
        create;
        allow
        read: if isKnownUser();
        allow
        update: if isOwner(userId) || isAdmin();
        allow
        delete
    :
        if isAdmin();
    }


    match/links/{linkId}
    {
        allow
        read, write;
    }

    match/deliverys/{deliveryId}
    {
        allow
        create;
        allow
        read: if isKnownUser()
            allow
        update: if isOwner(userId) || isAdmin();
        allow
        delete
    :
        if isAdmin();
    }

    match/roles/{roleId}
    {
        allow
        create;
        allow
        read: if isKnownUser();
        allow
        update: if isAdmin();
        allow
        delete
    :
        if isAdmin();
    }


    match/products/{productId}
    {
        allow
        read: if isKnownUser()
            allow
        create: if isAdmin();
        allow
        update: if isAdmin();
        allow
        delete
    :
        if isAdmin();
    }

    match/news/{newsId}
    {
        allow
        read: if isKnownUser()
            allow
        create: if isAdmin();
        allow
        update: if isAdmin();
        allow
        delete
    :
        if isAdmin();
    }

    match/categorys/{categoryId}
    {
        allow
        read: if isKnownUser()
            allow
        create: if isAdmin();
        allow
        update: if isAdmin();
        allow
        delete
    :
        if isAdmin();
    }


    match/sales/{saleId}
    {
        allow
        create, read, update
    :
        if isKnownUser();
        allow
        delete
    :
        if isAdmin();
    }

}
