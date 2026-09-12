# Automatización E2E con Playwright y TypeScript

Proyecto independiente para automatización de pruebas End-to-End usando
Playwright y TypeScript.

## Estructura

- tests/: specs de pruebas E2E.
- data/: datos estáticos de prueba.
- pages/: Page Objects.
- helpers/: funciones reutilizables.
- reports/: directorio de reportes.
- playground/: ejemplos académicos del curso.
- artifacts/: evidencias, videos, screenshots y reportes.
- README.md: documentacion del proyecto.

## Scripts iniciales

Ejecutar ejemplo TypeScript:

- npm run dev

## Validar tipos:

- npm run typecheck

## Comando Playwright:

npx playwright test
npm run taller1
npm run taller2
npm run taller3
npm run tarea1
npx playwright test tests/taller3/suiteAndActions.spec.ts
npm run taller4
npm run tarea2
npx playwright test #ejecutar prueba
npx playwright test --headed #aperturar el navegador
npx playwright test --ui #ejecuta prueba con la ventana del playwrigth
npx playwright test tests/tarea2/SD_Login.spec.ts

npx playwright test tests/tarea3/AE.spec.ts
npx run tarea3
npx playwright test tests/taller6/01-state-cookies-data-driven.spec.ts --headed

## Comando para ver Reporte de Pruebas en HTML:

- npx playwright show-report

## Comando Trabajo Integrador

-El primer suite debe ejecutar solo project=chromium:
npm run integrador.suite1:chromium
npx playwright test tests/integrador/AE_SignUp.spec.ts --project=chromium

-El segundo suite debe ejecutar solo project=webkit
npm run integrador:suite2.webkit
npx playwright test tests/integrador/AE_Integrador.spec.ts --project=webkit

-El tercer suite debe ejecutar la configuración principal ( 2 navegadores desktop, 1 navegador móvil y 3 worker)
npm run integrador:suite3:default
npx playwright test tests/integrador/AE_SignUp.spec.ts
