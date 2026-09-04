import { GitContentSource } from "@stackbit/cms-git";
import { defineStackbitConfig, type Field, type Model } from "@stackbit/types";

const stringField = (name: string, label: string, required = true): Field => ({
  name,
  label,
  type: "string",
  required,
});

const textField = (name: string, label: string, required = true): Field => ({
  name,
  label,
  type: "text",
  required,
});

const listOfStrings = (name: string, label: string): Field => ({
  name,
  label,
  type: "list",
  items: { type: "string" },
});

const objectField = (name: string, label: string, fields: Field[]): Field => ({
  name,
  label,
  type: "object",
  fields,
});

const listOfObjects = (name: string, label: string, fields: Field[]): Field => ({
  name,
  label,
  type: "list",
  items: {
    type: "object",
    fields,
  },
});

const visibleField: Field = {
  name: "visible",
  label: "Показывать на сайте",
  type: "boolean",
  default: true,
};

const profileModel: Model = {
  name: "Profile",
  label: "Главная страница",
  type: "data",
  filePath: "content/profile.json",
  singleInstance: true,
  fields: [
    listOfStrings("navigation", "Навигация"),
    stringField("navigationStatus", "Статус в навигации"),
    objectField("sectionLabels", "Названия разделов", [
      stringField("cases", "Кейсы"),
      stringField("method", "Как работаю"),
      stringField("otherProjects", "Другие проекты"),
      stringField("experience", "Опыт"),
      stringField("details", "Образование и инструменты"),
      stringField("contacts", "Контакты"),
    ]),
    objectField("release", "Метка версии", [
      stringField("label", "Название"),
      stringField("code", "Код"),
    ]),
    { name: "polish", type: "json", hidden: true },
    { name: "concepts", type: "json", hidden: true },
    objectField("hero", "Первый экран", [
      stringField("name", "Имя"),
      stringField("role", "Роль"),
      stringField("roleLine1", "Заголовок — строка 1"),
      stringField("roleLine2", "Заголовок — строка 2"),
      stringField("kicker", "Подзаголовок"),
      textField("intro", "Вводный текст"),
      stringField("promise", "Главная формула"),
      stringField("support", "Профессиональная ось"),
      stringField("context", "Контекст"),
      stringField("format", "Формат работы"),
      stringField("primaryCta", "Основная кнопка"),
      stringField("secondaryCta", "Кнопка PDF"),
      { name: "portraitSrc", label: "Фотография", type: "image", required: true },
      stringField("portraitAlt", "Описание фотографии"),
      stringField("portraitCaption", "Подпись фотографии"),
      listOfStrings("sourceLabels", "Исходные параметры"),
      listOfStrings("flow", "Этапы проектного потока"),
    ]),
    objectField("logic", "Project logic", [
      stringField("ariaLabel", "Доступное название схемы"),
      textField("diagramAlt", "Описание схемы"),
      stringField("inputLabel", "Название входа"),
      stringField("sequenceLabel", "Название последовательности"),
      stringField("sequenceValue", "Количество контрольных точек"),
      stringField("coreLabel", "Метка ядра"),
      stringField("coreValue", "Название ядра"),
    ]),
    objectField("caseIndex", "Индекс кейсов", [
      stringField("title", "Заголовок"),
      textField("intro", "Вводный текст"),
    ]),
    objectField("method", "Как работаю", [
      stringField("title", "Заголовок"),
      textField("intro", "Вводный текст"),
      listOfObjects("questions", "Управленческие вопросы", [
        stringField("question", "Вопрос"),
        stringField("answer", "Ответ"),
      ]),
      listOfObjects("scenarios", "Сценарии", [
        stringField("number", "Номер"),
        stringField("title", "Заголовок"),
        textField("text", "Логика"),
      ]),
    ]),
    objectField("summary", "Сводка полного резюме", [
      stringField("title", "Заголовок"),
      textField("text", "Текст"),
      listOfObjects("items", "Показатели", [
        stringField("value", "Значение"),
        stringField("label", "Подпись"),
      ]),
    ]),
  ],
};

const caseFields: Field[] = [
  visibleField,
  stringField("id", "ID", true),
  stringField("number", "Номер"),
  stringField("label", "Категория"),
  stringField("title", "Название кейса"),
  stringField("role", "Роль"),
  stringField("tools", "Инструменты"),
  stringField("scale", "Масштаб"),
  textField("context", "Контекст"),
  textField("before", "Что было до"),
  textField("diagnosis", "Диагностика"),
  textField("managementDecision", "Ключевое управленческое решение"),
  textField("rejectedOrNotChosen", "Что не выбрано"),
  textField("decisionRationale", "Почему выбран подход"),
  textField("influence", "Моё влияние"),
  textField("authorityBoundary", "Границы полномочий"),
  textField("riskRemoved", "Снимаемый риск"),
  textField("costOfError", "Стоимость ошибки"),
  textField("counterfactual", "Что было бы без изменения"),
  listOfStrings("implementation", "Механизм реализации"),
  textField("acceptance", "Контроль и приёмка"),
  textField("result", "Результат"),
  textField("systemChange", "Системное изменение"),
  textField("managementPrinciple", "Принцип управления"),
  listOfStrings("proofTags", "Что доказывает кейс"),
  objectField("visual", "Схема до / решение / после", [
    stringField("beforeValue", "Значение до", false),
    textField("beforeNote", "Подпись до", false),
    textField("beforeContext", "Контекст до", false),
    stringField("changeLabel", "Название изменения", false),
    textField("changeIntro", "Суть изменения", false),
    stringField("afterValue", "Значение после", false),
    textField("afterNote", "Подпись после", false),
    textField("afterContext", "Контекст после", false),
    listOfStrings("steps", "Шаги изменения"),
  ]),
];

const models: Model[] = [
  profileModel,
  {
    name: "Metrics",
    label: "Метрики и ссылки на кейсы",
    type: "data",
    filePath: "content/metrics.json",
    singleInstance: true,
    fields: [listOfObjects("items", "Метрики", [
      visibleField,
      stringField("value", "Значение"),
      stringField("meta", "Контекст"),
      stringField("link", "Текст ссылки"),
      stringField("target", "ID кейса"),
    ])],
  },
  {
    name: "Cases",
    label: "Подробные кейсы",
    type: "data",
    filePath: "content/cases.json",
    singleInstance: true,
    fields: [listOfObjects("items", "Кейсы", caseFields)],
  },
  {
    name: "OtherProjects",
    label: "Другие проекты",
    type: "data",
    filePath: "content/other-projects.json",
    singleInstance: true,
    fields: [listOfObjects("items", "Мини-кейсы", [
      visibleField,
      stringField("id", "ID"),
      stringField("label", "Категория"),
      stringField("title", "Название"),
      textField("decision", "Управленческое решение"),
      textField("risk", "Риск"),
      textField("result", "Результат"),
    ])],
  },
  {
    name: "Experience",
    label: "Опыт",
    type: "data",
    filePath: "content/experience.json",
    singleInstance: true,
    fields: [listOfObjects("items", "Места работы", [
      visibleField,
      stringField("period", "Период"),
      stringField("company", "Компания"),
      stringField("role", "Должность"),
      stringField("focus", "Фокус"),
      textField("scope", "Масштаб и зона ответственности"),
      listOfStrings("caseTargets", "Связанные кейсы"),
    ])],
  },
  {
    name: "Education",
    label: "Образование",
    type: "data",
    filePath: "content/education.json",
    singleInstance: true,
    fields: [listOfObjects("items", "Образование и курсы", [
      visibleField,
      stringField("year", "Год"),
      stringField("institution", "Организация"),
      stringField("program", "Программа"),
    ])],
  },
  {
    name: "Tools",
    label: "Инструменты",
    type: "data",
    filePath: "content/tools.json",
    singleInstance: true,
    fields: [
      stringField("title", "Заголовок"),
      listOfObjects("groups", "Группы инструментов", [
        stringField("label", "Название группы"),
        listOfStrings("items", "Инструменты"),
      ]),
      textField("aiNote", "Как использую ИИ"),
    ],
  },
  {
    name: "Contacts",
    label: "Контакты и PDF",
    type: "data",
    filePath: "content/contacts.json",
    singleInstance: true,
    fields: [
      stringField("title", "Заголовок"),
      textField("text", "Текст"),
      stringField("format", "Формат работы"),
      stringField("name", "Имя"),
      stringField("phone", "Телефон"),
      stringField("phoneHref", "Ссылка телефона"),
      stringField("email", "Email"),
      stringField("emailHref", "Ссылка email"),
      stringField("telegram", "Telegram"),
      { name: "telegramHref", label: "Ссылка Telegram", type: "url", required: true },
      { name: "resumeHref", label: "PDF-резюме", type: "file", required: true },
    ],
  },
  {
    name: "Seo",
    label: "SEO",
    type: "data",
    filePath: "content/seo.json",
    singleInstance: true,
    fields: [
      stringField("title", "Title"),
      textField("description", "Description"),
    ],
  },
];

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models,
      assetsConfig: {
        referenceType: "static",
        staticDir: "public",
        uploadDir: "uploads",
        publicPath: "/",
      },
    }),
  ],
});
