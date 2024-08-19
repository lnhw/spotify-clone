export default function PreferencesPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="px-8 pt-8 pb-3">
        <h1 className="text-white text-3xl pb-4  font-bold">Setting</h1>
        <div className="grid gap-3">
          <div>
            <h2 className="text-white text-base font-medium">Language</h2>
            <div className="flex items-center justify-between space-x-3">
              <div className="">
                <label className="text-[#b3b3b3] text-sm" htmlFor="">
                  Choose language - Changes will be applied after restarting the
                  app
                </label>
              </div>
              <div className="">
                <span className="flex items-center justify-between">
                  <select
                    className="p-1 outline-none rounded"
                    name="languages"
                    id="language-select"
                  >
                    <option value="english">United States (English)</option>
                    <option value="french">France (Français)</option>
                    <option value="spanish">Spain (Español)</option>
                    <option value="italian">Italy (Italiano)</option>
                    <option value="dutch">Belgium (Nederlands)</option>
                    <option value="french_belgium">Belgium (Français)</option>
                    <option value="german_belgium">Belgium (Deutsch)</option>
                    <option value="english_uk">United Kingdom (English)</option>
                    <option value="portuguese">Portugal (Português)</option>
                    <option value="danish">Denmark (Dansk)</option>
                    <option value="german">Germany (Deutsch)</option>
                    <option value="greek">Greece (Ελληνικά)</option>
                    <option value="arabic">Egypt (العربية)</option>
                    <option value="turkish">Turkey (Türkçe)</option>
                    <option value="russian">Russia (Русский)</option>
                    <option value="thai">Thailand (ไทย)</option>
                    <option value="chinese">China (中文)</option>
                    <option value="tagalog">Philippines (Tagalog)</option>
                    <option value="korean">South Korea (한국어)</option>
                    <option value="vietnamese_vn">Vietnam (Tiếng Việt)</option>
                    <option value="japanese">Japan (日本語)</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-white text-base font-medium">Display</h2>
            <div className="">
              <div className="">
                <label className="text-[#b3b3b3] text-sm" htmlFor="">
                  Show the now-playing panel on click of play
                </label>
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
