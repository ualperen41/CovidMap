//1) mock'lamak istediğimiz değişkeni import ederiz
import { render, screen, waitFor } from "@testing-library/react";
import { totalApi } from "../utils/api.js";
import Statistics from "../pages/home/statistics.jsx";
import { mockStatisticsData } from "../utils/constants";
//2) api isteğini atan get fonksiyonun yerine sahte bir fonksiyon koy (mock)
jest.mock("../utils/api", () => ({
  totalApi: { get: jest.fn() },
}));

test("bileşen render olduğunda ekrana loader gelir", () => {
  // sahte fonksiyonun çağrılınca promise (yükleniyor) döndürmesini istedik
  totalApi.get.mockReturnValue(new Promise(() => {}));
  //bileşeni renderla
  render(<Statistics />);
  // ekranda loader component'ı var mı?
  screen.getByTestId("loader");
});

test("api'dan hata gelirse ekrana hata mesajı gelir", async () => {
  //  mock çağırıldığı zaman hata döndürsün
  totalApi.get.mockRejectedValue(new Error("Bağlantı zaman aşımına uğradı"));

  //bileşeni renderla
  render(<Statistics />);

  // belirli bir sürenin ardından ekrana hata mesajı geliyor mu kontrol et
  // waitFor: fonkiyonda verilen olay geçekleşene kadar bir süre bekler
  await waitFor(() => screen.getByText("Üzgünüz bir hata oluştu"));
});

test("api'dan veri gelirse ekrana istatistikler gelir", async () => {
  // mock fonksiyonu çağrıldığında istatistik verisi döndürsün
  totalApi.get.mockResolvedValue({ data: mockStatisticsData });

  // bileşeni renderla
  render(<Statistics />);

  // api isteğinin atılmasını bekle
  await waitFor(() => expect(totalApi.get).toHaveBeenCalled());

  // ekrana veriler geldimi
  screen.getByText("Toplam Vaka");
  screen.getByText("Aktif Vaka");
  screen.getByText("Toplam Vefat");
});
