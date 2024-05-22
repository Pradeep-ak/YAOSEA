mongo -u root -p example <<EOF
    use ecomcatalog;
    db.createUser({user: 'root', pwd: 'example', roles: ["readWrite"]});
    db.createCollection('delete_me');
    db.delete_me.insert({name:"Dummy Data"});

    use ecomaccount;
    db.createUser({user: 'root', pwd: 'example', roles: ["readWrite"]});
    db.createCollection('delete_me');
    db.delete_me.insert({name:"Dummy Data"});

    use ecomadmin;
    db.createUser({user: 'root', pwd: 'example', roles: ["readWrite"]});
    db.createCollection('delete_me');
    db.delete_me.insert({name:"Dummy Data"});

    use ecomauth;
    db.createUser({user: 'root', pwd: 'example', roles: ["readWrite"]});
    db.createCollection('delete_me');
    db.delete_me.insert({name:"Dummy Data"});

    use ecomorder;
    db.createUser({user: 'root', pwd: 'example', roles: ["readWrite"]});
    db.createCollection('delete_me');
    db.delete_me.insert({name:"Dummy Data"});

EOF