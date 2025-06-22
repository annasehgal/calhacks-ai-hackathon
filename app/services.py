class Keys:
    @staticmethod
    def get_shot() -> List[SpottedPiShot]:
        return SpottedPiShot.query.all()

    @staticmethod
    def get_lost_pet() -> List[LostPet]:
        return LostPet.query.all()

    def get_matching(self):
        #marry comparable queries by percentage of likeliness fitting into a threshold
        pass

    def return_match(self):
        return self.ticket