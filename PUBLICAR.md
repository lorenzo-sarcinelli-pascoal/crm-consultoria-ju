# Publicar em https://lorenzo-sarcinelli-pascoal.github.io/crm-consultoria-ju/

O workflow envia a pasta **`docs/`** para a branch **`gh-pages`**.

## 1. Criar o repositório no GitHub

1. [github.com/new](https://github.com/new) → nome **`crm-consultoria-ju`** → **Public** → sem README inicial.

## 2. Enviar o código (mono-repo `debriefings-the`)

Na **raiz** do repositório que contém `crm-consultoria-ju/`:

```bash
cd /caminho/para/debriefings-the-main
git pull origin main

git branch -D crm-ju-github-pages 2>/dev/null
git subtree split -P crm-consultoria-ju -b crm-ju-github-pages

git push git@github.com:lorenzo-sarcinelli-pascoal/crm-consultoria-ju.git crm-ju-github-pages:main --force
```

## 3. Primeiro deploy (Actions)

Abra **Actions** e espere o workflow **Deploy GitHub Pages** concluir.

## 4. Ligar o Pages na branch `gh-pages`

No repo **`crm-consultoria-ju`**:

**Settings → Pages → Build and deployment**

- **Source:** **Deploy from a branch**
- **Branch:** **`gh-pages`** / **`/ (root)`**
- Save

## 5. URL

**https://lorenzo-sarcinelli-pascoal.github.io/crm-consultoria-ju/**

Configure no CRM: API Key, URL do Apps Script, PIN.

---

### Manutenção

Após alterar `crm-consultoria-ju/` no mono-repo: commit em `debriefings-the`, depois `subtree split` + `push` (passo 2).
