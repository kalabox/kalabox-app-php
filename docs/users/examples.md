Examples
========

Connect to an Acquia Site:
--------------------------

**Spin up the appropriate php stock app ie drupal7**
```
cd /path/to/apps/folder
kbox create drupal7
```
**Stop the site so we can make some changes**
```
cd appname
kbox stop
```
**Edit your kalabox.yml** file and add this:
```
    codeDir: code/docroot
```
To the sharing plugin in the pluginconfig section.

**Remove the generic code and clone your repo**
```
rm -rf code
git clone YOUR_ACQUIA_REPO_url code
```
**Run**:
```
kbox start
```
**Grab your DB from the acquia dashboard and run**:
```
kbox services
```
**Grab the external DB config, then import the DB with the external config like this**:
```
mysql -u drupal -pdrupal -h poets.kbox -P PORT# drupal < ~/path/to/db/file.sql
```
**Then go into your settings.php and at this at the bottom:**
```
if (isset($_ENV['KALABOX_UID'])) {
  $databases['default']['default'] = array(
    'driver' => 'mysql',
    'database' => 'drupal',
    'host' => 'database',
    'username' => 'drupal',
    'password' => 'drupal',
    'port' => '3306',
  );
}
```

Q'PLAH!
