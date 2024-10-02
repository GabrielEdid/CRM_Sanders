import ejs from "ejs";
import path from "path";

type RenderTemplateResult = {
  success: boolean;
  html?: string;
  error?: string;
};

async function renderTemplate<T extends ejs.Data>(
  templatePath: string,
  templateData: T
): Promise<RenderTemplateResult> {
  try {
    const view = await ejs.renderFile(templatePath, templateData);
    return {
      success: true,
      html: view,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export const donationHtmlTemplate = async (
  body1: string,
  headerArticle1: string | null,
  bodyArticle1: string | null,
  headerArticle2: string | null,
  bodyArticle2: string | null,
  stat1: string,
  descriptionStat1: string,
  stat2: string,
  descriptionStat2: string,
  stat3: string,
  descriptionStat3: string,
  headerArticle3: string | null,
  bodyArticle3: string | null
) => {
  const templateData = {
    body1,
    headerArticle1,
    bodyArticle1,
    stat1,
    descriptionStat1,
    stat2,
    descriptionStat2,
    stat3,
    descriptionStat3,
    headerArticle2,
    bodyArticle2,
    headerArticle3,
    bodyArticle3,
    currentYear: new Date().getFullYear(),
  };

  const templatePath = path.join(
    process.cwd(),
    "src/templates/emailTemplates/donationEmailTemplate.ejs"
  );

  const { success, html, error } = await renderTemplate(
    templatePath,
    templateData
  );

  if (success) {
    return html!;
  } else {
    console.error("Error al renderizar la plantilla:", error);
    return null;
  }
};
