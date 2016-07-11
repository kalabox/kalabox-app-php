Configuration
=============

"PHP on Kalabox" will add a new custom `php` section to your app's `kalabox.yml` file. Most of this information is added during the initial creation of your app but some configuration options can be changed. You can also alter the config provided by the [core Kalabox plugins](http://docs.kalabox.io/en/stable/users/config)

!!! attention "Why is my file syncing so slow?"
    File sharing is a notoriously hard problem for local development environments. Luckily, we've provided a few settings to optimize the performance of your sync in the event that our default file sharing settings are not sufficient. For info on how to do that and for more background on this FML problem check out our section on [file sharing](http://docs.kalabox.io/en/stable/users/config/#sharing)

Sharing
-------

"PHP on Kalabox" will slightly alter the functionality of the [default sharing plugin](http://docs.kalabox.io/en/stable/users/config/#sharing) so that it ignores the `filemount` for your CMS. Your Drupal, WordPress and Backdrop files are shared via a differnet mechanism and should be accessible in the `files` directory of your app root. Here are the directories we ignore given the CMS:

```yaml
drupal: 'sites/default/files'
drupal8: 'sites/default/files'
wordpress: 'wp-content/uploads'
backdrop: 'files'
```

!!! attention "Where is my files directory?"
    Check the `files` directory in your app root.

PHP
---

Here is an example of a normal `php` section in your `kalabox.yml` file.

```yaml
php:
  framework: drupal
  version: '7'
  image: 'drupal:7'
  filemoount: 'sites/default/files'
```

### Changing the following is NOT CURRENTLY RECOMMENDED

**framework** - Either `drupal`, `backdrop` or `wordpress`
**version** - The major version of the framework.
**image** - The Docker image and tag that we grab for your `appserver`
**filemount** - The location of your static files. Differs per framework. See above for the possible values.
