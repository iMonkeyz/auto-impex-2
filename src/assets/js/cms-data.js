export default {
    Types: (function () {

        let ValueTypes = {
            Text: "TEXT",
            TextArea: "TEXTAREA",
            Media: "MEDIA",
            Boolean: "BOOLEAN",
            Others: "OTHERS",
        }

        let KeyName = {
            Media: {
                Desktop: "Desktop Media", Tablet: "Tablet Media", Mobile: "Mobile Media"
            }
        }
    
        let components = [];
        components.push({
            type: "CMSLinkComponent",
            alias: "Link",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: "LinkName", key: "linkName", localized: true, unique: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: "URL", key: "url", type: ValueTypes.Text
                });
                attrs.push({
                    name: "Open In New Tab", key: "external", type: ValueTypes.Boolean, defVal: false
                });
                return attrs;
            })()
        });
        components.push({
            type: "CMSParagraphComponent",
            alias: "Text",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: "Content", key: "content", localized: true, type: ValueTypes.TextArea
                });
                return attrs;
            })()
        });
        components.push({
            type: "CMSImageComponent",
            alias: "Image",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: "Desktop Media", key: "media(code, $contentCV)", localized: true, type: ValueTypes.Media
                });
                attrs.push({
                    name: "Tablet Media", key: "mediaForTablet(code, $contentCV)", localized: true, type: ValueTypes.Media
                });
                attrs.push({
                    name: "Mobile Media", key: "mediaForMobile(code, $contentCV)", localized: true, type: ValueTypes.Media
                });
                return attrs;
            })()
        });
        components.push({
            type: "SimpleBannerComponent",
            alias: "Banner",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: KeyName.Media.Desktop, key: "media(code, $contentCV)", localized: true, type: ValueTypes.Media
                });
                attrs.push({
                    name: KeyName.Media.Tablet, key: "mediaForTablet(code, $contentCV)", localized: true, type: ValueTypes.Media
                });
                attrs.push({
                    name: KeyName.Media.Mobile, key: "mediaForMobile(code, $contentCV)", localized: true, type: ValueTypes.Media
                });
                return attrs;
            })()
        });

        components.push({
            type: "IwaPopupComponent",
            alias: "Popup",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: "Trigger LinkName", key: "linkName", localized: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: "Popup Title", key: "title", localized: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: "Popup SubTitle", key: "subTitle", localized: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: "Popup Content", key: "content", localized: true, type: ValueTypes.TextArea
                });
                attrs.push({
                    name: "Popup Buttons", key: "buttons", localized: true, type: ValueTypes.TextArea
                });
                return attrs;
            })()
        });

        components.push({
            type: "IwaRotatingBannerV2",
            alias: "RotatingBanner",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: "URL", key: "url", localized: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: KeyName.Media.Desktop, key: "media(code, $contentCV)", localized: true, type: ValueTypes.Media
                });
                attrs.push({
                    name: KeyName.Media.Tablet, key: "mediaForTablet(code, $contentCV)", localized: true, type: ValueTypes.Media
                });
                attrs.push({
                    name: KeyName.Media.Mobile, key: "mediaForMobile(code, $contentCV)", localized: true, type: ValueTypes.Media
                });
                return attrs;
            })()
        });

        components.push({
            type: "IwaAdvancedRotatingImagesComponentV2",
            alias: "RotatingImages",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: "URL", key: "url", localized: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: "Title Type", key: "titleType(code)", defVal: "BULLETS", type: ValueTypes.Text
                });
                attrs.push({
                    name: "Rotating Banners Ref.IDs", key: "iwaBanners(uid, $contentCV)", placeholder: "填写已创建的RotatingBannerV2的ID, 多个使用逗号(,)分隔", type: ValueTypes.TextArea
                });
                attrs.push({
                    name: "Visible", key: "visible", defVal: true, type: ValueTypes.Boolean
                });
                return attrs;
            })()
        });

        components.push({
            type: "IwaRangeBannerComponent",
            alias: "RangeBanner",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: "Range Title", key: "rangeTitle", localized: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: "Range Banner", key: "rangeBanner(uid, $contentCV)", placeholder: "填写已创建的SimpleBannerComponent的ID", type: ValueTypes.Text
                });
                return attrs;
            })()
        });

        components.push({
            type: "IwaVideoComponent",
            alias: "Video",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: "Title", key: "title", localized: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: "Description", key: "descriptionText", localized: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: "Content", key: "content", localized: true, type: ValueTypes.TextArea
                });
                return attrs;
            })()
        });

        components.push({
            type: "IwaBlogComponent",
            alias: "Blog",
            attrs: (_ => {
                let attrs = [];
                attrs.push({
                    name: "Title", key: "title", localized: true, type: ValueTypes.Text
                });
                attrs.push({
                    name: "Post Date", key: "postDate[dateformat=dd.MM.yyyy HH:mm:ss]", type: ValueTypes.Text
                });
                attrs.push({
                    name: "Link", key: "link(uid, $contentCV)", placeholder: "填写已创建的CMSLinkComponent的ID", type: ValueTypes.TextArea
                });
                attrs.push({
                    name: "Desktop Banner", key: "banner(code, $contentCV)", placeholder: "填写已创建的Media.Code", localized: true, type: ValueTypes.Media
                });
                attrs.push({
                    name: "Tablet Banner", key: "bannerForTablet(code, $contentCV)", placeholder: "填写已创建的Media.Code", localized: true, type: ValueTypes.Media
                });
                attrs.push({
                    name: "Mobile Banner", key: "bannerForMobile(code, $contentCV)", placeholder: "填写已创建的Media.Code", localized: true, type: ValueTypes.Media
                });
                return attrs;
            })()
        });

        let AttrFactory = {
            copy(attr) {
                let newAttr = JSON.parse(JSON.stringify(attr));
                delete newAttr["localized"];
                newAttr["value"] = attr.defVal === undefined ? "" : attr.defVal;
                return newAttr;
            }
        }
    
        //handle localized fields
        components.map(component => {
            let adjustAttrs = [];
            component.attrs.map(attr => {
                let placeholder = attr.placeholder ===undefined ? `组件属性 - ${attr.key}` : attr.placeholder;
                if ( attr.localized ) {
                    let adjustAttrEn = AttrFactory.copy(attr);
                    adjustAttrEn["lang"] = "en";
                    adjustAttrEn["placeholder"] = `${placeholder} [英文][默认]`;
    
                    let adjustAttrZh = AttrFactory.copy(attr);
                    adjustAttrZh["lang"] = "zh";
                    adjustAttrZh["placeholder"] = `${placeholder} [简体]`;
    
                    let adjustAttrZt = AttrFactory.copy(attr);
                    adjustAttrZt["lang"] = "zt";
                    adjustAttrZt["placeholder"] = `${placeholder} [繁体]`;
    
                    adjustAttrs.push(adjustAttrEn);
                    adjustAttrs.push(adjustAttrZh);
                    adjustAttrs.push(adjustAttrZt);
                } else {
                    let adjustAttr = AttrFactory.copy(attr);
                    adjustAttr.placeholder = placeholder;
                    adjustAttrs.push(adjustAttr);
                }
            });
            component.attrs = adjustAttrs;
        });
    
        let exportList = {
            Headers: {},
            Components: {},
            ComponentTypes: [],
            PageTypes: {}
        };
    
        /* cms components */
        components.map(component => {
            let header = component.attrs.map(attr => {
                let field = attr.key + (attr.lang === undefined ? "" : `[lang=${attr.lang}]`);
                field = field + (attr.defVal === undefined ? "" : `[default='${attr.defVal}']`);
                return field;
            }).join(";");
    
            exportList.Headers[component.type] = {
                script: `INSERT_UPDATE ${component.type};$contentCV[unique=true];uid[unique=true];name;${header}`
            }
            exportList.Components[component.type] = _ => {
                return JSON.parse(JSON.stringify(component));
            }
    
            exportList.ComponentTypes.push(component.type);
        });
    
        /* content slot */
        exportList.Headers["ContentSlot"] = {
            comments: `# create content slots`,
            script: `INSERT_UPDATE ContentSlot;$contentCV[unique=true];uid[unique=true];name;active;cmsComponents(uid,$contentCV)`
        }
    
        /* content slot for page */
        exportList.Headers["ContentSlotForPage"] = {
            comments: `# fill slot into page`,
            script: `INSERT_UPDATE ContentSlotForPage;$contentCV[unique=true];uid[unique=true];position[unique=true];page(uid,$contentCV)[unique=true];contentSlot(uid,$contentCV)[unique=true]`
        }
        
        /* content slot name */
        exportList.Headers["ContentSlotName"] = {
            comments: `# slot's components restriction`,
            script: `INSERT_UPDATE ContentSlotName;name[unique=true];template(uid,$contentCV)[unique=true];validComponentTypes(code)`
        }

        exportList.PageTypes["ContentPage"] = {
            comments: `# create content page`,
            script: `INSERT_UPDATE ContentPage;$contentCV[unique=true];uid[unique=true];name;masterTemplate(uid,$contentCV);label;defaultPage[default='true'];approvalStatus(code)[default='approved'];homepage[default='false']`
        }
    
        return exportList;
    }) ()
}