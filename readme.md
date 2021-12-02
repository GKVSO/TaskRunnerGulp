# Task Runner Gulp — GKVS (Volkov Sergey)
---
## Easy and convenient to use Task Runner
```
git init
git clone Link
```

### Using TaskRunner
Before working, you need to install all dependencies and libraries
```
npm i
```
__! The collector installs jquery by default, if you don't need it, you can delete it in the package file.json or command__ ```npm uninstall jquery --save```
To start, enter the command in the console:
```
gulp
```

### What functions does this TaskRunner have ?
* JS compression and concatenation
* Css compression and concatenation
* Working with scss / sass
* Image Compression
* Automatic page refresh
* Building a project

For convenient operation, the __images__ folder is divided into 2 parts: __src__, __dest__
When uploading images to the src folder, they will be automatically compressed and added to the dist folder
<br>

In the styles/css folder you will find the main.css, config.css files and the blocks folder
Where:
* main.scss file where all the others are imported .scss
* config.scss file for default styles
* block - The folder where styles are stored .scss splitting into categories (header, footer, etc.)

```
<!--#include virtual="/parts/header.html" -->
```

___
## Российская версия документации

### Простой и удобный в использовании TaskRunner
```
git init
git clone Link
```
### Использование TaskRunner
Перед началом работы необходимо установить все зависимости и библиотеки
```
npm i
```
__! Сборщик устанавливает jquery по умолчанию, если он вам не нужен, вы можете удалить его в файле package.json или командой__ ``npm uninstall jquery --save``
Для начала введите команду в консоли:
```
gulp
```
### Какие функции выполняет этот TaskRunner ?
* Сжатие и конкатинирование js
* Сжатие и конкатинирование css
* Пабота с scss / sass
* Сжатие картинок
* Автоматическое обновление страницы
* Сборка проекта

Для удобной работы папка images разделена на 2 части: __src__, __dist__
При загрузки изображений в папку src они будут автоматически сжиматься и добавлятся в папку dist

В папке styles/scss вы найдете файлы __main.scss__, __config.scss__ и папку __blocks__
Где:
* main.scss – файл куда импортируется все остальные .scss
* config.scss – файл для дефолтных стилей
* block – Папка где хранятся стили .scss разбытие на категории ( header, footer и т.д )

```
<!--#include virtual="/parts/header.html" -->
```



