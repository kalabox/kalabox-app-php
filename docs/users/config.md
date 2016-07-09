Configuration
=============

"PHP on Kalabox" will add a new custom `php` section to your app's `kalabox.yml` file. Most of this information is added during the initial creation of your app but some configuration options can be changed. You can also alter the config provided by the [core Kalabox plugins](http://docs.kalabox.io/en/stable/users/config)

!!! attention "Why is my file syncing so slow?"
    File sharing is a notoriously hard problem for local development environments. Luckily, we've provided a few settings to optimize the performance of your sync in the event that our default file sharing settings are not sufficient. For info on how to do that and for more background on this FML problem check out our section on [file sharing](http://docs.kalabox.io/en/stable/users/config/#sharing)

PHP
---

Here is an example of a normal `php` section in your `kalabox.yml` file.

```yaml
php:
  framework: drupal
  version: '7'
  image: 'drupal:7'
```

### Changing the following is NOT CURRENTLY RECOMMENDED

**framework** - Either `drupal`, `backdrop` or `wordpress`
**version** - The major version of the framework.
**image** - The Docker image and tag that we grab for your `appserver`
