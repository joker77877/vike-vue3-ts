import vue from '@vitejs/plugin-vue'
import vike from 'vike/plugin'
import { UserConfig } from 'vite'
import VueDevTools from "vite-plugin-vue-devtools"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import Icons from "unplugin-icons/vite"
import { FileSystemIconLoader } from "unplugin-icons/loaders"
import IconsResolver from "unplugin-icons/resolver"
import { ElementPlusResolver, AntDesignVueResolver } from "unplugin-vue-components/resolvers"

const config: UserConfig = {
  plugins: [vue(), vike(),VueDevTools(),
    Components({
      dirs: ["components"],
      dts: true,
      resolvers: [
        ElementPlusResolver({ importStyle: "sass", ssr: true }),
        AntDesignVueResolver({ importStyle: "less" }),
        IconsResolver({
          prefix: false,
          customCollections: ["icon"],
          enabledCollections: ["ep"]
        })
      ]
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: [
        // presets
        "vue",
        "vue-router",
        "pinia",
        {
          vue: ["isVNode"],
          "@vueuse/core": ["useMouse", "useFullscreen", "useStorage"],
          "vue-router": ["createRouter", "createWebHistory"],
          "vue-request": ["useRequest", "setGlobalOptions", ["usePagination", "useMyPagination"]],
          "@/api": [["default", "http"]],
          axios: [["default", "axios"]]
        },
        {
          from: "vue-router",
          imports: ["RouteRecordRaw"],
          type: true
        },
        {
          from: "vue",
          imports: ["CSSProperties", "Directive"],
          type: true
        },
        {
          from: "element-plus",
          imports: [
            "TabsPaneContext",
            "UploadProps",
            "UploadUserFile",
            "UploadRawFile",
            "UploadFile",
            "UploadInstance",
            "FormInstance",
            "FormItemInstance",
            "FormRules"
          ],
          type: true
        },
        {
          from: "axios",
          imports: ["AxiosInstance", "AxiosError", "AxiosRequestConfig", "InternalAxiosRequestConfig", "AxiosResponse"],
          type: true
        }
      ],
      dirs: ["src/config/**", "src/hooks/**", "src/enums/**", "src/api/**", "src/stores/**", "src/utils/**", "src/constants/**"],
      vueTemplate: true,
      resolvers: [
        ElementPlusResolver({ importStyle: "sass", ssr: true }),
        AntDesignVueResolver({ importStyle: "less" }),
        IconsResolver({
          prefix: false,
          enabledCollections: ["icon"]
        })
      ]
    }),
    Icons({
      customCollections: {
        icon: FileSystemIconLoader("./assets/icons")
      },
      iconCustomizer(collection, icon, props) {
        props.width = "2em"
        props.height = "2em"
      }
    })]
} 

export default config
