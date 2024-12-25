import {useWebApp, useWebAppCloudStorage, useWebAppPopup, useWebAppRequests} from "vue-tg";
import {defineStore} from "pinia";

export const useTgWebAppStore = defineStore('tgWebAppStore', {
  state: ()=>({
    webAppData: null,
    dataUnsafe: null,
    contactData: null
  }),
  actions: {
    init() {
      this.initDataUnsafe()
      this.useContactData()
    },
    initDataUnsafe() {
      useWebAppCloudStorage().getStorageItem('initDataUnsafe').then(data=>{
        if(typeof data === 'string' && data === '') {
          this.dataUnsafe = useWebApp().initDataUnsafe
          useWebAppCloudStorage().setStorageItem('initDataUnsafe', JSON.stringify(this.dataUnsafe))
        } else {
          this.dataUnsafe = JSON.parse(data)
        }
      })
    },
    useContactData() {
      useWebAppCloudStorage().getStorageItem('contactData').then(data => {
        if (typeof data === 'string' && data==='') {
          useWebAppRequests().requestContact((ok, response)=>{
            if(ok){
              this.contactData = response.responseUnsafe.contact
              useWebAppCloudStorage().setStorageItem('contactData', JSON.stringify(response.responseUnsafe.contact))
            } else {
              useWebAppPopup().showAlert('Aloqa o`rnatilmadi')
            }
          })
        }
      })
    }
  },
  getters: {

  }
})
