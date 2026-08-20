# Nuxt Starter Template

[![Nuxt UI](https://img.shields.io/badge/Made%20with-Nuxt%20UI-00DC82?logo=nuxt&labelColor=020420)](https://ui.nuxt.com)

Use this template to get started with [Nuxt UI](https://ui.nuxt.com) quickly.

- [Live demo](https://starter-template.nuxt.dev/)
- [Documentation](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

<a href="https://starter-template.nuxt.dev/" target="_blank">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://ui.nuxt.com/assets/templates/nuxt/starter-dark.png">
    <source media="(prefers-color-scheme: light)" srcset="https://ui.nuxt.com/assets/templates/nuxt/starter-light.png">
    <img alt="Nuxt Starter Template" src="https://ui.nuxt.com/assets/templates/nuxt/starter-light.png" width="830" height="466">
  </picture>
</a>

> The starter template for Vue is on https://github.com/nuxt-ui-templates/starter-vue.

## Quick Start

```bash [Terminal]
npm create nuxt@latest -- -t ui
```

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-name=starter&repository-url=https%3A%2F%2Fgithub.com%2Fnuxt-ui-templates%2Fstarter&demo-image=https%3A%2F%2Fui.nuxt.com%2Fassets%2Ftemplates%2Fnuxt%2Fstarter-dark.png&demo-url=https%3A%2F%2Fstarter-template.nuxt.dev%2F&demo-title=Nuxt%20Starter%20Template&demo-description=A%20minimal%20template%20to%20get%20started%20with%20Nuxt%20UI.)

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Renovate integration

Install [Renovate GitHub app](https://github.com/apps/renovate/installations/select_target) on your repository and you are good to go.

##----##
Заметки

1. Должен быть на проекте маппер, что будет преобразовывать null (что приходил с бэка) в undefined т.к. Это индустриальный стандарт, характерный для большинства UI-библиотек как в экосистеме Vue, так и в React.

В нормальной архитектуре эту задачу решает слой маппинга (Data Mapper) на границе приложения.

1. Входной маппинг (Server -> UI)
   При получении ответа от API функция mapToSettingsProps заменяет null на undefined или пустую строку "".

2. Работа формы
   Компоненты формы работают с чистыми типами string | undefined без костылей и ручных проверок в шаблонах.

3. Выходной маппинг (UI -> Server)
   Перед отправкой формы функция подготовки пайлоада конвертирует пустые строки и undefined обратно в null для бэкенда.

Примеры в других экосистемах

Vue (Vuetify, PrimeVue, Shadcn Vue, Element Plus)
Все они типизируют modelValue текстовых полей как string | undefined или string. Попытка прокинуть null в VTextField или ElInput вызывает ошибки TypeScript.

React (MUI, Ant Design, Radix UI)
В React передача null в проп value инпута вызывает предупреждение о переключении между неуправляемым и управляемым компонентом. React строго требует строку или undefined.

Причины всеобщего отказа от null

Согласованность с TypeScript
Опциональные свойства объектов в TypeScript по умолчанию дают тип string | undefined. Поддержка null вынуждала бы усложнять все внутренние типы библиотеки.

Нативные стандарты HTML
В спецификации DOM у инпута нет состояния null. Свойство value элементов ввода всегда возвращает строку.

Разделение зон ответственности
Авторы библиотек изолируют UI-слой от специфики БД, где null обозначает отсутствие записи.

Слой маппинга между DTO бэкенда и формой UI является стандартом индустрии при работе с любым фреймворком.

#Согласование ERROR
Учитывая, что регламент позиционирует error как сущность без типа (type any)из-за того, что error м.б. действительно по-любому отображаться, то должно быть согласование между бэком и фронтом об типе ошибке, что будет возвращаться с сервера в качестве ответа. У меня такой тип:
type TBackendError = {
statusCode: number;
message: string | string[];
error: string;
};

В коде создаётся особая функция или условие для проверки типа ошибки, которая должна или методом сверки со свойством или иным определять какой тип ошибки пришёл и через if условие формировать логику работы при ошибке.

#@internationalized/date
Используй только в computed компонентов, не выноси на уровень обработки ответов API и иной слой, где подключается SSR nuxt,
В процессе SSR перед отправкой HTML клиенту Nuxt пытается гидратировать состояние и запускает devalue.

devalue падает при попытке сериализовать класс CalendarDate, так как это не POJO.

#Не работает указание класса в app.config.ts
Если указать такой класс в утилите tailwind, затем в app.config.ts можно использовать этот класс в вариантах цвета для кнопок, то такая конструкция не работает, но при этом работает, если просто значения указать
@utility sketchy-border {
--i: sibling-index();
--r1: calc(220px + 35px * sin(var(--i) * 1.5));
--r2: calc(15px + 10px * cos(var(--i) * 2.3));
--r3: calc(240px + 30px * sin(var(--i) * 3.7));
--r4: calc(12px + 8px * cos(var(--i) * 4.1));

border-radius: var(--r1) var(--r2) var(--r3) var(--r4) / var(--r2) var(--r3) var(--r4) var(--r1);
}
