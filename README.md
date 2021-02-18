> Why do I have a folder named ".expo" in my project?

The ".expo" folder is created when an Expo project is started using "expo start" command.

> What does the "packager-info.json" file contain?

The "packager-info.json" file contains port numbers and process PIDs that are used to serve the application to the mobile device/simulator.

> What does the "settings.json" file contain?

The "settings.json" file contains the server configuration that is used to serve the application manifest.

> Should I commit the ".expo" folder?

No, you should not share the ".expo" folder. It does not contain any information that is relevant for other developers working on the project, it is specific to your machine.

Upon project creation, the ".expo" folder is already added to your ".gitignore" file.

##Manifest URL##
An Expo app manifest is similar to a web app manifest - it provides information that Expo needs to know how to run the app and other relevant data. Read more in "How Expo Works".

When you publish a project you are given a manifest URL. This is where your app will look for updates in the future. The URL you are given is not directly accessible in the web browser without adding some additional headers or parameters.

For example, the manifest URL for the app with the slug native-component-list published by the user community is https://exp.host/@community/native-component-list. If we want to inspect this in our web browser, we can add /index.exp?sdkVersion=37.0.0 to it. The end result is: https://exp.host/@community/native-component-list/index.exp?sdkVersion=37.0.0.


##Project page##
When you successfully run expo publish for your project, a project page is created that shows your app icon and description, and includes a QR code that can be scanned to open the app in some situations.

The Expo client app for Android can open any app, but due to limitations of the iOS platform, you are only able to view your own projects or projects published to a development team that you are a member of. This is useful in testing and ongoing development work, but rather than sharing your project page to end-users you should deploy to app stores.

EXPO:SETTING
{
  "hostType": "lan",
  "lanType": "ip",
  "dev": true,
  "minify": false,
  "urlRandomness": null,
  "https": false,
  "scheme": null,
  "devClient": false
}
